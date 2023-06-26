'use client';
import React, { useState, useEffect, useContext, createContext } from 'react';
import {
  User,
  useSessionContext,
  useUser as useSupaUser,
} from '@supabase/auth-helpers-react';
import { UserDetails, Subscription } from '../types';

// we need to define the userContext type which we need to be pass as the value from the useUser Context
type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
};

// created the userContext which is of type UserContexttype and no initial values are setted into it;
const userContext = createContext<UserContextType | undefined>(undefined);

// declaring the interface for the props
export interface Props {
  [propname: string]: any;
}

export const UserContextProvider = (props: Props) => {
  //using the useSessionContext hook from the supabase which will provide us with session related properties
  const {
    session,
    isLoading: isLoadingUser,
    error,
    supabaseClient: supabase,
  } = useSessionContext();
  //Provides us with current user
  const user = useSupaUser();
  const access_token = session?.access_token ?? null;
  // states which needed to managed through the userContext;
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  // creating functions which will query to the supabase tables can provide us the results
  const getUserDetails = () => supabase.from('users').select('*').single();
  const getSubscription = () => {
    return supabase
      .from('subscriptions')
      .select('*,prices(*,products(*))')
      .in('status', ['trialing', 'active'])
      .single();
  };
  //using the useEffect hook for the sideeffect handling and fetching data from the supabase
  useEffect(() => {
    if (user && !isLoadingData && !userDetails && !subscription) {
      setIsLoadingData(false);
      Promise.allSettled([getUserDetails(), getSubscription()]).then(
        (results) => {
          const userDetailsPromise = results[0];
          const subscriptionPromise = results[1];
          if (userDetailsPromise.status === 'fulfilled') {
            setUserDetails(userDetailsPromise.value.data as UserDetails);
          }
          if (subscriptionPromise.status === 'fulfilled') {
            setSubscription(subscriptionPromise.value.data as Subscription);
          }

          setIsLoadingData(false);
        }
      );
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);
      setSubscription(null);
    }
  }, [user, isLoadingUser]);

  const value = {
    access_token,
    user,
    userDetails,
    subscription,
    isLoading: isLoadingUser || isLoadingData,
  };

  return <userContext.Provider value={value} {...props} />;
};

export const useUserState = () => {
  const context = useContext(userContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a MyUserContextProvider.`);
  } else {
    return context;
  }
};

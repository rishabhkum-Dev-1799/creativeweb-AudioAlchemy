import Stripe from 'stripe';

export interface Song {
    id: string;
    user_id: string;
    song_path: string;
    image_path: string;
    author: string;
    title: string;
};

export interface UserDetails {
    id: string;
    first_name: string;
    last_name: string;
    full_name?: string;
    avatar_url?: string;
    billing_address?: Stripe.Address;
    payment_method?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type];
}

export interface Product {
    id: string;
    active?: boolean;
    name: string;
    description?: string;
    image?: string;
    metadata?: Stripe.Metadata;
}

export interface Price {
    id: string;
    product_id?: string;
    active?: boolean;
    description?: string;
    unit_amount?: number;
    currency?: string;
    type?: Stripe.Price.Type;
    interval?: Stripe.Price.Recurring.Interval;
    interval_count?: number;
    trial_period_days?: number | null;
    metadata?: Stripe.Metadata;
    products?: Product;
};

export interface Subscription {
    id: string;
    user_id: string;
    created: string;
    trial_start?: string;
    trial_end?: string;
    canceled_at?: string;
    cancel_at?: string;
    ended_at?: string;
    current_period_start?: string;
    current_period_end?: string;
    cancel_at_period_end?: boolean;
    status?: Stripe.Subscription.Status;
    metadata?: Stripe.Metadata;
    price_id?: string;
    prices?: Price;

};

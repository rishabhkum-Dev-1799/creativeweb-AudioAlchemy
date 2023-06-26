import * as Dialog from '@radix-ui/react-dialog';
import { IoMdClose } from 'react-icons/io';
interface ModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  children: React.ReactNode;
  onChange: (open: boolean) => void;
}
const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  description,
  children,
  onChange,
}) => {
  return (
    <>
      <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
        <Dialog.Portal>
          <Dialog.Overlay
            className='
            bg-neutral-900/90
            backdrop-blur-sm
            fixed
            inset-0
          '
          />
          <Dialog.Content
            className='
            fixed
            drop-shadow-md
            border
            border-neutral-700
            top-[50%]
            left-[50%]
            max-h-full
            h-full
            text-white
            md:h-auto
            w-full
            md:w-[90vh]
            md:max-w-[450px]
            p-[25px]
            translate-x-[-50%]
            translate-y-[-50%]
            rounded-md
            bg-neutral-800
            focus:outline-none
          '
          >
            <Dialog.Title
              className='
            text-center
            text-xl
            font-bold
            mb-4
            '
            >
              {title}
            </Dialog.Title>
            <Dialog.Description
              className='
                text-center
                text-sm
                mb-5
                leading-normal
            '
            >
              {description}
            </Dialog.Description>
            <div>{children}</div>
            <Dialog.Close asChild>
              <button
                className='
                absolute
                text-neutral-400
                hover:text-white
                transition
                h-[25px]
                w-[25px]
                top-[10px]
                right-[10px]
                inline-flex
                items-center
                justify-center
                appearance-none
                rounded-full
                focus:outline-none
              '
              >
                <IoMdClose />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

export default Modal;

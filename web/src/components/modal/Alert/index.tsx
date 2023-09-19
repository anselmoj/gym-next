import {
  forwardRef,
  ForwardRefRenderFunction,
  Fragment,
  ReactNode,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

import { Dialog, Transition } from '@headlessui/react'
import { Warning } from '@phosphor-icons/react'

interface IRefProps {
  close(): void
  open(): void
}

interface IProps {
  message: string
  title: string
  children: ReactNode
  buttonColor?: string
  buttonText?: string
  iconType?: 'WARNING'
  onClick(): void
}

const ComponentModalAlertWithRef: ForwardRefRenderFunction<
  IRefProps,
  IProps
> = (
  { buttonColor, buttonText, children, iconType, onClick, message, title },
  ref,
) => {
  const cancelButtonRef = useRef<HTMLButtonElement>(null)

  const [isOpened, setIsOpened] = useState<boolean>(false)

  const openModal = useCallback(() => {
    setIsOpened(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsOpened(false)
  }, [])

  useImperativeHandle(ref, () => ({
    open: openModal,
    close: closeModal,
  }))

  return (
    <Transition.Root as={Fragment} show={isOpened}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={closeModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg`}
              >
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex  sm:items-center">
                    <div className="mx-auto  flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <Warning
                        aria-hidden="true"
                        className="h-6 w-6 text-red-600"
                      />
                    </div>

                    <div
                      className={`  ${
                        iconType ? 'ml-4' : 'ml-0'
                      } mt-3 text-center  sm:mt-0 sm:text-left`}
                    >
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        {title}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">{message}</p>
                      </div>
                      {children}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    className={`inline-flex w-full justify-center rounded-md ${buttonColor} px-3 py-2 text-sm font-semibold text-white shadow-sm hover:${buttonColor} sm:ml-3 sm:w-auto`}
                    onClick={onClick}
                    type="button"
                  >
                    {buttonText}
                  </button>

                  <button
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={closeModal}
                    ref={cancelButtonRef}
                    type="button"
                  >
                    Cancelar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export type { IRefProps }
const ComponentModalAlert = forwardRef(ComponentModalAlertWithRef)
export default ComponentModalAlert

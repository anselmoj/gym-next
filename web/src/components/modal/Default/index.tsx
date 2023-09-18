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

interface IRefProps {
  close(): void
  open(): void
}

interface IProps {
  message?: string
  title: string
  children: ReactNode
  buttonColor?: string
  buttonText?: string
  width: 'sm:max-w-3xl' | 'sm:max-w-lg'
}

const ComponentModalDefault: ForwardRefRenderFunction<IRefProps, IProps> = (
  { buttonColor, buttonText, children, message, title, width },
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
        onClose={() => setIsOpened(false)}
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
                className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full ${width}`}
              >
                <div className="justify-center bg-primary px-4 py-3  sm:flex sm:flex-row-reverse sm:px-6">
                  <Dialog.Title
                    as="h3"
                    className="justify-center text-xl font-semibold leading-6 text-white"
                  >
                    {title}
                  </Dialog.Title>
                </div>
                <div className="pb-4 pt-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-center">
                    <div
                      className={`ml-0 mt-3 text-center sm:mt-0 sm:text-left`}
                    >
                      {children}
                    </div>
                  </div>
                </div>
                <div className="justify-between bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <div className="flex">
                    <button
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setIsOpened(false)}
                      ref={cancelButtonRef}
                      type="button"
                    >
                      Cancelar
                    </button>

                    <button
                      className={`inline-flex w-full justify-center rounded-md ${buttonColor}  px-3 py-2 text-sm font-semibold text-white shadow-sm hover:${buttonColor} sm:ml-3 sm:w-auto`}
                      onClick={() => setIsOpened(false)}
                      type="button"
                    >
                      {buttonText}
                    </button>
                  </div>

                  <button
                    className="mt-3  w-full rounded-md bg-primary px-8 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-700 sm:mt-0 sm:w-auto"
                    onClick={() => setIsOpened(false)}
                    ref={cancelButtonRef}
                    type="button"
                  >
                    Editar
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
export default forwardRef(ComponentModalDefault)

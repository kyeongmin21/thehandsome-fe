import {Dialog} from '@headlessui/react'
import UiButton from './UiButton';

export default function UiModal({
                                  isOpen,
                                  setIsOpen,
                                  title,
                                  children,
                                  onSave,
                                  saveText,
                                  onCancel,
                                  cancelText,
                              }) {

    return (
        <div className='modal'>
            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
                <Dialog.Panel className="bg-white rounded-lg shadow-xl w-full max-w-md border border-gray-200">
                    <Dialog.Title className="flex justify-between items-center pl-4">
                        <div><b>{title}</b></div>
                        <UiButton
                            color={'blackText'}
                            onClick={() => setIsOpen(false)}
                            btnText={'X'}/>
                    </Dialog.Title>

                    <Dialog.Description as="div" className="p-4">
                        {children}
                    </Dialog.Description>

                    <div className="flex justify-center gap-2 p-4">
                        <UiButton onClick={onCancel} btnText={cancelText} size={'s'} color={'blackOutline'}></UiButton>
                        <UiButton onClick={onSave} btnText={saveText} size={'s'} color={'blackOutline'}></UiButton>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </div>
    )
}
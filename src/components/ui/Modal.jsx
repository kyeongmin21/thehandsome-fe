import {Dialog} from '@headlessui/react'
import Button from './Button';

export default function Modal({
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
                        <Button
                            color={'blackText'}
                            onClick={() => setIsOpen(false)}
                            btnText={'X'}/>
                    </Dialog.Title>

                    <Dialog.Description as="div" className="p-4">
                        {children}
                    </Dialog.Description>

                    <div className="flex justify-center gap-2 p-4">
                        <Button onClick={onCancel} btnText={cancelText} size={'s'} color={'blackOutline'}></Button>
                        <Button onClick={onSave} btnText={saveText} size={'s'} color={'blackOutline'}></Button>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </div>
    )
}
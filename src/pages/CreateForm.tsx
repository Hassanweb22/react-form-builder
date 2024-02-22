import { DndContext, DragOverlay, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';

import { KeyboardSensor, PointerSensor } from '../lib/dndKitSensors';
import FormElements from '../components/create-form/FormElements';
import {
    FormElementButton,
    FormElementButtonProps,
} from '../components/create-form/DraggableButton';
import { useEffect, useRef, useState } from 'react';
import FormPlayground from '../components/create-form/FormPlayground';
import { EyeIcon, HammerIcon } from 'lucide-react';
import { useFormPlaygroundStore } from '../stores/formPlaygroundStore';
import toast from 'react-hot-toast';
// import { Switch } from '../components/ui/Switch';
import FormPreview from '../components/create-form/FormPreview';
import { FormType } from '@/types';
import Switch from '@/components/tailwindUi/Switch';
import Input from '@/components/tailwindUi/Input';
import Button from '@/components/tailwindUi/Button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/AlertDialog';

interface Props {
    formType?: 'add' | 'edit';
    form?: FormType;
}

export default function CreateForm({ formType = 'add', form }: Props) {

    const [isPreview, setIsPreview] = useState(false);

    const [formName, setFormName] = useState(form?.name ?? '');
    const [activeButton, setActiveButton] =
        useState<FormElementButtonProps | null>(null);
    const [isDropped, setIsDropped] = useState(false);

    const addFormElement = useFormPlaygroundStore(state => state.addFormElement);
    const removeAllFormElements = useFormPlaygroundStore(
        state => state.removeAllFormElements,
    );
    const { formElements, formJsx } = useFormPlaygroundStore(state => state);

    useEffect(() => {
        return () => {
            if (formType === 'edit') removeAllFormElements();
        };
    }, [removeAllFormElements, formType]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );


    useEffect(() => {
        if (formJsx) {
            console.log(formJsx);
        }
    }, [formJsx])



    return (
        <DndContext
            sensors={sensors}
            onDragStart={e => {
                setActiveButton(e.active.data.current?.element);
                setIsDropped(false);
            }}
            onDragCancel={() => {
                setActiveButton(null);
                setIsDropped(false);
            }}
            onDragEnd={({ over, active }) => {
                setActiveButton(null);
                if (!over) return;
                addFormElement(
                    active.data.current?.element.text as string,
                    active.id as string,
                );
                setIsDropped(true);
            }}
        >
            <div className="flex gap-12">
                <FormElements isUpdate={formType === 'edit'} />
                <form
                    className="flex flex-grow flex-col"
                    onSubmit={e => {
                        e.preventDefault();
                        console.log('submitting');
                        if (formElements.length === 0) {
                            toast.error('Form is empty!');
                            return;
                        }
                        setTimeout(() => {
                            setIsPreview(true);
                        }, 500);
                        // mutate();
                    }}
                >
                    <section className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-3 whitespace-nowrap">
                            {/* <label className="font-medium">Form Name:</label>
                            <Input
                                required
                                placeholder="Enter form name"
                                value={formName}
                                onChange={e => setFormName(e.target.value)}
                            /> */}
                        </div>
                        <div className="flex items-center gap-4 text-sm font-medium">
                            <div
                                className={`flex items-center gap-2 transition-colors ${isPreview ? '' : 'text-primary'
                                    }`}
                            >
                                <HammerIcon className="h-5 w-5" />
                                <span>Builder</span>
                            </div>
                            <Switch
                                // className="data-[state=unchecked]:bg-primary"
                                checked={isPreview}
                                onCheckedChange={setIsPreview}
                            // onChange={setIsPreview}
                            />
                            <div
                                className={`flex items-center gap-2 transition-colors ${isPreview ? 'text-primary' : ''
                                    }`}
                            >
                                <EyeIcon className="h-5 w-5" />
                                <span>Preview</span>
                            </div>
                        </div>
                    </section>
                    {isPreview ? (
                        <FormPreview />
                    ) : (
                        <FormPlayground
                            isDropped={isDropped}
                            resetIsDropped={() => setIsDropped(false)}
                            isUpdate={formType === 'edit'}
                        />
                    )}
                    <section className="mt-5 flex items-center gap-5 self-end">
                        {/* {isDemo && <DemoInfoCard />} */}
                        {/* {form ? (
                            <Button onClick={() => navigate('/my-forms')} variant="outline">
                                Cancel
                            </Button>
                        ) : null} */}
                        {formElements.length !== 0 ? (
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button type="button" variant="destructive">
                                        Clear Form
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Clear Form?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Are you sure you want to clear the form? This action is
                                            irreversible and will permanently remove all the progress
                                            in the current form.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter className="sm:space-x-4">
                                        <AlertDialogAction onClick={removeAllFormElements}>
                                            Yes, clear form
                                        </AlertDialogAction>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        ) : null}
                        <Button
                            // disabled={isDemo}
                            // isLoading={isPending}
                            // className={isDemo ? 'gap-2.5' : ''}
                            type="submit"
                        >
                            {/* {isDemo && <LockIcon className="h-[18px] w-[18px]" />} */}
                            <span>{form ? 'Update Form' : 'Save Form'}</span>
                        </Button>
                    </section>
                </form>
            </div>
            <DragOverlay modifiers={[restrictToWindowEdges]}>
                {activeButton ? (
                    <FormElementButton className="cursor-grabbing" {...activeButton} />
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}

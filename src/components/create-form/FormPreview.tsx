import { useFormPlaygroundStore } from '../../stores/formPlaygroundStore';
import FormElementCard from './FormElementCard';
import { ScrollArea } from '../ui/ScrollArea';
import { forwardRef, useEffect, memo, useRef } from 'react';

const FormPreview = forwardRef(() => {
  const { formElements, setFormRefNodes } = useFormPlaygroundStore(state => state);

  const formRef = useRef<HTMLUListElement | null>(null)

  useEffect(() => {
    if (formRef?.current) {
      console.log(formRef.current);
      setFormRefNodes(formRef?.current);
    }
  }, [formRef])

  return (
    <section className="flex-grow rounded-lg border-2 border-dashed border-slate-300 bg-muted">
      {formElements.length === 0 ? (
        <p className="flex h-full items-center justify-center font-medium text-muted-foreground">
          Add some form elements in the builder view
        </p>
      ) : (
        <ScrollArea className="h-[calc(100vh-212px)]">
          <ul className="space-y-5 p-5" ref={formRef}>
            {formElements.map(element => (
              <li key={element.id}>
                <FormElementCard formElement={element} isView />
              </li>
            ))}
          </ul>
        </ScrollArea>
      )}
    </section>
  );
});

export default memo(FormPreview);
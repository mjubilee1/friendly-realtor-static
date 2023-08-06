import React, { useRef, useState } from 'react';
import { mergeRefs } from 'react-merge-refs';
import { v4 as uuidv4 } from 'uuid';
import { FileInputProps } from './FileInputTypes';
import Button from '../../Button';
import { Label } from '../Shared/Label';
import { Group } from '../Shared/Group';
import { ValidationMessage } from '../Shared/ValidationMessage';
import { HelperMessage } from '../Shared/HelperMessage';

export const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  (props: FileInputProps, ref) => {
    const {
      accept,
      className = '',
      helperText,
      hideLabel,
      id,
      label = '',
      name,
      placeholder,
      validationText,
      onChange = () => undefined,
      text,
      ...restProps
    } = props;

    const [, setFiles] = useState<File[]>([]);
    // If an id is not provided, generate one to explicitly bind the label to the input
    const fieldId = uuidv4() || id;

    // Note: For applications that need multifile support, they can prepare
    // a comma-separated list of filenames and include that as the text prop.

    // Commented below code for displayMessage to pave way for getting input filename
    // filename from props(As no multi file use case currently exists).
    // Previously, the section below would always display filename irrespective
    // of restrictions on file type that could be applied by the application (caller)

    // const displayMsg = useMemo(
    //   () =>
    //     files.length
    //       ? files
    //           .map((file) => file.name)
    //           .reduce((prev, next) => `${prev}, ${next}`)
    //       : placeholder || "Drop or select file",
    //   [files, placeholder]
    // );

    const fileNameText = text || placeholder || 'Drop or select file';
    const localInputRef = useRef<HTMLInputElement>(null);
    const combinedRef = mergeRefs([localInputRef, ref]);

    return (
      <>
        <Group
          className={`${className} flex flex-wrap items-center rounded-lg gap-2 w-full`}
          noGutter={hideLabel}
        >
          <div className="text-white">
            <Label htmlFor={fieldId} hidden={hideLabel}>
              {label}
            </Label>
          </div>
          <div className="flex items-center gap-4 flex-row justify-start w-full text-black bg-white">
            <div className="flex flex-row items-center cursor-pointer h-8 m-0 p-0 border-none relative w-full transition-all duration-300 ease-in border-[1px] box-border hover:shadow-lg">
              <input
                // Assign both the local and any forwarded refs
                ref={combinedRef}
                accept={accept}
                name={name}
                id={fieldId}
                onChange={(event) => {
                  const elementFiles = event.target.files as FileList;
                  setFiles(Object.values(elementFiles));
                  onChange(event);
                }}
                className="cursor-pointer absolute w-full opacity-0 border-none"
                type="file"
                {...restProps}
              />
              <span className="cursor-pointer px-4">{fileNameText}</span>
            </div>
            <Button
              onClick={() => {
                const inputEl = localInputRef.current;
                inputEl?.click();
              }}
              type="button"
              color="secondary"
              className="text-white rounded-sm mr-2"
            >
              Browse
            </Button>
          </div>
        </Group>
        {(helperText || validationText) && (
          <div className="w-[544px] ml-32">
            {helperText && <HelperMessage>{helperText}</HelperMessage>}
            {validationText && <ValidationMessage>{validationText}</ValidationMessage>}
          </div>
        )}
      </>
    );
  },
);

export default FileInput;

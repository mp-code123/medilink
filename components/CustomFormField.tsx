"use client"

import React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control } from 'react-hook-form'
import { FormFieldType } from './forms/PatientForm'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input' // Import PhoneInput without Value type
import Image from 'next/image'
import ReactDatePicker from "react-datepicker";
import { Select, SelectContent, SelectTrigger } from './ui/select'
import { SelectValue } from '@radix-ui/react-select'
import { Checkbox } from './ui/checkbox'


interface CustomProps {
    control: Control<any>,
    fieldType: FormFieldType,
    name: string,
    label?: string,
    placeholder?: string,
    iconSrc?: string,
    iconAlt?: string,
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    renderSkeleton?: (field: any) => React.ReactNode
}

const RenderField = ({ field, props }: { field: any, props: CustomProps }) => {
    const { fieldType, iconAlt, iconSrc, placeholder, showTimeSelect, dateFormat, renderSkeleton } = props;

    switch (fieldType) {
        case FormFieldType.INPUT:
            return (
                <div className='flex rounded-md border border-dark-500 bg-dark-400'>
                    {iconSrc && (
                        <Image src={iconSrc} height={24} width={24} alt={iconAlt || 'icon'} className='ml-2' />
                    )}
                    <FormControl>
                        <Input placeholder={placeholder} {...field} className='shad-input border-0' />
                    </FormControl>
                </div>
            );

        case FormFieldType.PHONE_INPUT:
            return (
                <FormControl>
                    {/* Change here: Use string | undefined instead of E164Number */}
                    <PhoneInput
                        defaultCountry="US"
                        placeholder={placeholder}
                        international
                        withCountryCallingCode
                        value={field.value as string | undefined} // Ensure it's a string or undefined
                        onChange={field.onChange}
                        className='input-phone'
                    />
                </FormControl>
            );

        case FormFieldType.DATE_PICKER:
            return (
                <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    <Image
                        src="/assets/icons/calendar.svg"
                        height={24}
                        width={24}
                        alt="user"
                        className="ml-2"
                    />
                    <FormControl>
                        <ReactDatePicker
                            showTimeSelect={props.showTimeSelect ?? false}
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                            timeInputLabel="Time:"
                            dateFormat={props.dateFormat ?? "MM/dd/yyyy"}
                            wrapperClassName="date-picker"
                        />
                    </FormControl>
                </div>
            )
        case FormFieldType.SELECT:
            return (
                <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger className='shad-select-trigger'>
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent className='shad-select-content'>
                            {props.children}
                        </SelectContent>
                    </Select>
                </FormControl>
            )

        case FormFieldType.INPUT:
            return (
                <FormControl>
                    <Input placeholder={placeholder} className="shad-textArea" disabled={props.disabled} />
                </FormControl>
            )

        case FormFieldType.CHECKBOX:
            return (
                <FormControl>
                <div className="flex items-center gap-4">
                  <Checkbox
                    id={props.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <label htmlFor={props.name} className="checkbox-label">
                    {props.label}
                  </label>
                </div>
              </FormControl>
            )
        case FormFieldType.SKELETON:
            return renderSkeleton ? renderSkeleton(field) : null


        default:
            return null;
    }
}

const CustomFormField = (props: CustomProps) => {
    const { control, label, fieldType, name } = props;
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className='flex-1'>
                    {fieldType !== FormFieldType.CHECKBOX && label && (
                        <FormLabel>{label}</FormLabel>
                    )}

                    <RenderField field={field} props={props} />
                    <FormMessage className='shad-error' />
                </FormItem>
            )}
        />
    )
}

export default CustomFormField

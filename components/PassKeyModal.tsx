"use client"
import React, { useEffect, useState } from 'react'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { decryptKey, encryptKey } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

const PassKeyModal = () => {
    const [open, setOpen] = useState(true);
    const [passkey, setPasskey] = useState('')
    const [error, setError] = useState('')
    const path = usePathname();

    const encryptedKey = typeof window !== 'undefined' ? window.localStorage.getItem('accessKey') : null;

    useEffect(() => {
        const accessKey = encryptedKey && decryptKey(encryptedKey);

        if (path) {
            if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
                const encryptedKey = encryptKey(passkey)
                localStorage.setItem('accessKey', encryptedKey)
                setOpen(false)
                router.push('/admin')
            } else {
                setOpen(true);
            }
        }
    }, [encryptedKey])

    const router = useRouter();
    const closeModal = () => {
        setOpen(false);
        router.push('/')
    }

    const validatePasskey = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
            const encryptedKey = encryptKey(passkey)
            localStorage.setItem('accessKey', encryptedKey)
            setOpen(false)
        } else {
            setError("Invalid passkey! please try again.")
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent className='shad-alert-dialog'>
                <AlertDialogHeader>
                    <AlertDialogTitle className='flex items-start justify-between'>Admin Access Verification</AlertDialogTitle>
                    <Image src="assets/icons/close.svg" width={20} height={20} alt="close" onClick={() => closeModal()} className='cursor-pointer' />
                    <AlertDialogDescription>
                        To Access the admin page, please enter passkey.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div>
                    <InputOTP maxLength={6} value={passkey} onChange={(value) => setPasskey(value)}>
                        <InputOTPGroup className='shad-otp'>
                            <InputOTPSlot className='shad-otp-slot' index={0} />
                            <InputOTPSlot className='shad-otp-slot' index={1} />
                            <InputOTPSlot className='shad-otp-slot' index={2} />
                            <InputOTPSlot className='shad-otp-slot' index={3} />
                            <InputOTPSlot className='shad-otp-slot' index={4} />
                            <InputOTPSlot className='shad-otp-slot' index={5} />
                        </InputOTPGroup>

                    </InputOTP>
                    {error && <p className='shad-error text-14-regular mt-4 flex justify-center'>
                        {error}
                    </p>}

                </div>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={(e) => validatePasskey(e)} className='shad-primary-btn'>Enter Admin Passkey</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default PassKeyModal

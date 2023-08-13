"use client";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState, useCallback } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../buttons/Button";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";

const LoginModal = () => {
    const [isLoading, setIsLoading] = useState(false);

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn("credentials", { ...data, redirect: false }).then((callback) => {
            setIsLoading(false);

            if (callback?.ok) {
                toast.success("Signed in successfully");
                router.refresh();
                loginModal.onClose();
            }

            if (callback?.error) {
                toast.error(callback.error || "Something went wrong");
            }
        });
    };

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Welcome back"
                subtitle="Sign in to your account! Book hotels with no extra cost."
                center
            />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                registerField={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                label="Password"
                type="password"
                disabled={isLoading}
                registerField={register}
                errors={errors}
                required
            />
        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={() => {}}
            />
            <Button
                outline
                label="Continue with Github"
                icon={AiFillGithub}
                onClick={() => signIn("github")}
            />
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="flex flex-row items-center justify-center gap-2">
                    <div>Don't have an account?</div>
                    <div
                        onClick={loginModal.onClose}
                        className="text-neutral-800 cursor-pointer hover:underline"
                    >
                        Sign Up
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Sign In"
            actionLabel="Continue"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default LoginModal;

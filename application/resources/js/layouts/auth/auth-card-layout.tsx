// import sigmaLogo from '../../../../public/sigma-logo.webp';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/ui/Header';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

export default function AuthCardLayout({
    children,
    title,
    description,
}: PropsWithChildren<{
    name?: string;
    title?: string;
    description?: string;
}>) {
    return (
        <>
            <Header
                heading={
                    <>
                        Welcome to <span className="text-[var(--color-migenta)]">Sigma Africa</span>
                    </>
                }
                subheading=""
                description="Login to your account to access your dashboard and manage your courses"
                className={{ background: "linear-gradient(90deg, #0a2540, #06659b)" }}
                textColor="text-white"
                showStatistics={false}
            />
            <div className="flex min-h-vh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
                <div className="flex w-full max-w-md flex-col gap-6">
                    <div className="flex flex-col gap-6">
                        <Card className="rounded-xl">
                            <CardHeader className="px-10 pt-8 pb-0 text-center">
                                <CardTitle className="text-xl">{title}</CardTitle>
                                <CardDescription>{description}</CardDescription>
                            </CardHeader>
                            <CardContent className="px-10 py-8">{children}</CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

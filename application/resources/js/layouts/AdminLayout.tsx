import { PropsWithChildren, ReactNode } from "react";
import AuthenticatedLayout from "./AuthenticatedLayout";

interface Props {
    header?: ReactNode;
}

export default function AdminLayout({ header, children }: PropsWithChildren<Props>) {
    return (
        <AuthenticatedLayout>
            <div className="bg-gray-50 min-h-screen">
                {header && (
                    <header className="border-b bg-white px-4 py-3 shadow-sm">
                        {header}
                    </header>
                )}

                <main className="p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </AuthenticatedLayout>
    );
}

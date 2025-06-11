import PageHead from "@/components/commons/PageHead"
import { Fragment, ReactNode } from "react";

interface PropTypes {
    children: ReactNode;
    title?: string;
}


const AuthLayout = (props: PropTypes) => {
    const {title, children} = props;
    return (
        <div className="flex min-h-screen min-wfull flex-col items-center justify-center gap-10 py-10 lg:py">
            <PageHead title={title}></PageHead>
            <section className="max-w-screen-3xl 3xl:container p-6">
                {children}
            </section>
        </div>
    )
};

export default AuthLayout;
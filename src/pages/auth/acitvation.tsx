import { useEffect } from "react";
import { useRouter } from "next/router";

const AcitvationRedirect = () => {
    const router = useRouter();
    
    useEffect(() => {
        // Redirect to the correct activation URL with the same code parameter
        const { code } = router.query;
        if (code) {
            router.replace(`/auth/activation?code=${code}`);
        } else {
            router.replace("/auth/activation");
        }
    }, [router.query]);

    return (
        <div className="flex w-screen h-screen items-center justify-center">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Redirecting...</h1>
                <p className="text-gray-600">Please wait while we redirect you to the activation page.</p>
            </div>
        </div>
    );
};

export default AcitvationRedirect; 
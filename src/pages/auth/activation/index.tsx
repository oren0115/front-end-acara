import AuthLayout from "@/components/layouts/authLayout"
import Activation from "@/components/views/Auth/Activation";
import authServices from "@/services/auth.services";


interface PropTypes {
    status: "success" | "failed"
}



const ActivationPage = (props : PropTypes) =>{
    return (
        <AuthLayout title="Acara | Activation">
           <Activation {...props}/>
        </AuthLayout>
    )
};

export async function getServerSideProps(context: {query: {code: string}}) {

    try {
        const result = await authServices.activation({code: context.query.code});
        console.log(result.data.data);
        if(result.data.data) {
            return {
                props: {
                    status: "success",

                },
            };
        }else{
            return {
                props: {
                    status: "failed",

                },
            };
        }
    } catch (error) {
        return {
            props: {
                status: "success",

            },
        };
    }



}


export default ActivationPage;
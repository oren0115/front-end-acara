import Head from "next/head";

interface PropTypes{
    title?: string;
}

const PageHead = (props: PropTypes) =>{
    const {title = 'Acara'} = props;
    return (
        <Head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>{title}</title>

        </Head>
    )
}

export default PageHead;


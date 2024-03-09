import { Rings } from 'react-loader-spinner';

const PageLoader = () => {

    return (
        <div className="container-fluid m-5">
            <div className="d-flex justify-content-center align-items-center">
                <span className="display-2 me-2 fw-semibold text-shade100">L</span>
                <Rings
                    height="120"
                    width="120"
                    color="#528b6e"
                    radius="12"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="rings-loading"
                />
                <span className="display-2 ms-2 fw-semibold text-shade100">ading</span>
            </div>
        </div>
    )
}

export default PageLoader;
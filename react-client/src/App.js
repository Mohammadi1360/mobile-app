import React, {Fragment, useState} from 'react'
import {useDataApi} from './reducer/app/useDataApi';
import {Button, Input, Label} from 'reactstrap';

const App = () => {
    const [query, setQuery] = useState(1);
    const [{data, isLoading, isError}, doFetch] = useDataApi(
        'http://localhost:3003/api/public/personnel',
        {data: []},
    );

    const onClickSubmit = (event) => {
        doFetch(
            `http://localhost:3003/api/public/personnel/${query}`,
        );

        // console.log("data ==>");
        // console.log(data);

        event.preventDefault();
    };

    return (
        <div className="container">
            {/*<UserForm/>*/}
            <div className="row justify-content-center mt-3">
                <div className="col-md-8 col-lg-6 col-xl-5">
                    <div className="card">

                        <div className="card-body p-4">
                            <form className="pt-2" onSubmit={onClickSubmit}>

                                <div className="form-group mb-3">
                                    <Label htmlFor="searchQuery">Search</Label>
                                    <Input
                                        id="searchQuery"
                                        placeholder="Enter your value" required
                                        type="text"
                                        value={query}
                                        onChange={event => setQuery(event.target.value)}/>

                                </div>

                                <Button color="danger">Search</Button>
                            </form>


                            <ul className="list-group mt-3">
                                <li className="list-group-item active">
                                    Result List
                                </li>
                                {isError &&
                                <li className="text-center list-unstyled alert-danger">Something went wrong ...</li>}
                                {isLoading ? (
                                    <li className="text-center list-unstyled alert-warning">Loading ...</li>
                                ) : (
                                    <Fragment>
                                        {data.length ? data.map(item => (
                                                <li className="list-group-item" key={item.id}>
                                                    <a href="#" className="list-group-item list-group-item-action">
                                                        {item.firstName} {item.lastName}
                                                    </a>
                                                </li>
                                            )) :

                                            <li className="text-center list-unstyled alert-warning">
                                                No Result Found...
                                            </li>
                                        }
                                    </Fragment>
                                )}
                            </ul>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default App

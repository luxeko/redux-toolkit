import './App.css';
import {fetchAllUsers} from "./redux/action/actions";
import {useDispatch, useSelector} from "react-redux";
import store from "./redux/store";
import {useEffect} from "react";
import {Button, Container, Table} from "react-bootstrap";
import {SyncLoader} from "react-spinners";

function App() {
    const dispatch = useDispatch()
    const count = useSelector((state) => state.counter.count)
    const count2 = store.getState().counter.count
    const users = useSelector((state) => state.user.listUsers)
    const isLoading = useSelector((state) => state.user.isLoading)
    const isError = useSelector((state) => state.user.isError)

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchAllUsers())
        }
        fetchData().then(res => res)
    }, [dispatch])

    const handleDelete = (id) => {
        console.log(id)
    }
    return (<div className="App">
        <Container className={'mt-5'}>
            <Table striped={true} bordered={true} hover={true}>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Body</th>
                </tr>
                </thead>
                <tbody>
                {
                    isError === true ? <div>Something wrongs, fix it...</div> :
                    isLoading === true ?
                        <tr>
                            <td colSpan={3}>
                                <SyncLoader loading={isLoading} color="#36d7b7"/>
                            </td>
                        </tr> :
                        users && users.length > 0 ?
                            users.map((item, index) => {
                                return (<tr key={`user-${index}`}>
                                    <td>{index + 1}</td>
                                    <td>{item.title}</td>
                                    <td>{item.body}</td>
                                    <td>
                                        <Button variant="danger"
                                                onClick={() => handleDelete(+item.id)}>Delete</Button>
                                    </td>
                                </tr>)
                            }) :
                            <tr>
                                <td colSpan={3}>
                                    Không có dữ liệu
                                </td>
                            </tr>
                }
                </tbody>
            </Table>
        </Container>

    </div>);
}

export default App;

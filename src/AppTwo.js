import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {decrement, increment, incrementByAmount, incrementAsync, selectCount} from "./reduxToolkit/slices/couterSlice";
import {Button, Container, Table} from "react-bootstrap";
import {getPostById, fetchAllPosts} from "./reduxToolkit/slices/userSlice";
import {SyncLoader} from "react-spinners";

const AppTwo = () => {
    // const count = useSelector((state) => state.counter1.value)
    const count = useSelector(selectCount)
    const dispatch = useDispatch()
    const [incrementAmount, setIncrementAmount] = useState('2');
    const posts = useSelector((state) =>state.user1.listPosts)
    const isLoading = useSelector((state) => state.user1.isLoading)
    const isError = useSelector((state) => state.user1.isError)

    useEffect(() => {
        const test = async () => {
            await dispatch(fetchAllPosts())
        }
        test()
    }, [dispatch])

    const handleGetPost = async () => {
        let postId = 1
        await dispatch(getPostById(postId)).unwrap()
        await console.log(posts)
    }

    return (
        <div className="App">
            <Container className={'mt-5'}>
                <button
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    Increment
                </button>
                <span className={`mx-4`}>Count = {count}</span>
                <button
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    Decrement
                </button>
                <div>
                    <input value={incrementAmount} onChange={e => setIncrementAmount(e.target.value)}
                           className={`number`}/>
                    <button onClick={() => dispatch(incrementByAmount(Number(incrementAmount) || 0))}>Add Amount
                    </button>
                    <button onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}>Add Async</button>
                </div>
            </Container>
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
                                posts && posts.length > 0 ?
                                    posts.filter((item, index) => {return index < 5}).map((item, index) => {
                                        return (
                                            <tr key={`post-${index}`}>
                                                <td>{index + 1}</td>
                                                <td>{item.title}</td>
                                                <td>{item.body}</td>
                                                <td>
                                                    <Button variant="danger">Delete</Button>
                                                </td>
                                            </tr>
                                        )
                                    }) :
                                    <tr>
                                        <td colSpan={3}>
                                            Không có dữ liệu
                                        </td>
                                    </tr>
                    }
                    </tbody>
                </Table>
                <Button variant="primary" onClick={handleGetPost}>Create post</Button>
            </Container>
        </div>
    );
};

export default AppTwo;
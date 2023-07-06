import PostCardSection from '../../../components/PostCardSection';
import { useState, useEffect } from 'react';
import TabBar from './TabBar';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../redux/selectors/userSelector';
import { toast, ToastContainer } from 'react-toastify';
import clsx from 'clsx';
import { Link, useNavigate } from 'react-router-dom';

const OPTIONS = [
    { id: 3, name: 'Mới nhất' },
    { id: 1, name: 'Nhiều lượt thích' },
    { id: 2, name: 'Nhiều lượt xem' },
];

function Home() {
    var a = false;

    const [c, setC] = useState(3);
    const [hide, setHide] = useState(true);

    console.log('init');

    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [selectedOption, setSelectedOption] = useState(OPTIONS[0]);
    const user = useSelector(userSelector);
    const navigate = useNavigate();
    const showEmtpy = () => toast.error('Danh sách bài viết trống!');
    useEffect(() => {
        getPosts();
    }, []);
    function handleSelectedOptionChange(option) {
        console.log('Option change: ', option);
        if (option.id == 1) {
            setC(1);
            console.log('Option la : ', option, c);
        } else if (option.id == 2) {
            setC(2);
            console.log('Option la : ', option, c);
        } else {
            setC(3);
        }
        getPosts();
    }
    function getPosts() {
        setPosts([]);
        fetch('http://localhost:5000/api/post/')
            .then((res) => res.json())
            .then((resJson) => {
                setPosts(resJson.posts);
            })
            .catch((error) => {
                console.log(error);
                setPosts([]);
            });
    }
    function handleSelectedTabChange(tab) {
        console.log('Tab change: ', tab);
        setPosts([]);
        var string = '';
        if (tab.id == 1) {
            string = 'posts';
            // selectedOption(OPTIONS[0]);
            setHide(true);
        } else {
            if (tab.id == 2) {
                string = 'posts/following/posts';
                setHide(false);
            } else {
                string = 'posts/saved/posts';
                setHide(false);
            }
        }
        fetch('http://localhost:5000/api/' + string, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + user?.token,
            },
        })
            .then((res) => res.json())
            .then((resJson) => {
                setPosts(resJson.posts);
                console.log(resJson.posts);
            })
            .catch((error) => {
                console.log(error);
                setPosts([]);
            });
    }

    console.log(a);
    return (
        <div className="">
            <TabBar
                hide={hide}
                setHide={setHide}
                options={OPTIONS}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                onSelectedOptionChange={handleSelectedOptionChange}
            />
            {/* Danh sách post */}
            <div className="flex h-full max-h-[85vh] flex-col" style={{ overflowY: 'overlay' }}>
                {posts?.map((post, index) => (
                    <PostCardSection key={index} postInit={post} full={true} />
                ))}
                {!posts ? (
                    <div className="flex items-center ">
                        <h1>Không có bài viết</h1>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}

export default Home;

import PostCartSection from '../../components/PostCardSection';
import { useParams } from 'react-router-dom';
function DetailPost() {
    const { id } = useParams();
    return (
        <>
            <div className="flex h-full max-h-[85vh] flex-col" style={{ overflowY: 'overlay' }}>
                <PostCartSection postId={id} full={false} />;
            </div>
        </>
    );
}

export default DetailPost;

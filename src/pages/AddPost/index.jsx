import { useFormik } from 'formik';
import { useCallback, useState } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { convert as convertHTMLtoText } from 'html-to-text';
import CategoryInput from '../../components/PostControl/CategoryInput';
import PostContentEditor from '../../components/PostControl/PostContentEditor';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { userSelector } from '../../redux/selectors/userSelector';
import ImageInput from '../../components/PostControl/ImageInput';
import { toast } from 'react-toastify';

const validationSchema = Yup.object({
    title: Yup.string().required('Trường này bắt buộc').min(4, 'Tiêu đề phải ít nhất 4 kí tự'),
    content: Yup.string().test('min-content', 'Nội dung phải ít nhất 6 kí tự', (value) => {
        const plainValue = convertHTMLtoText(value, { wordwrap: false });
        return plainValue.length >= 6;
    }),
    categoryId: Yup.string().required('Trường này bắt buộc'),
});

function CreatePost() {
    const [loading, setLoading] = useState(false);
    const showSuccessNoti = () => toast.success('Tạo bài đăng thành công!');
    const showErorrNoti = () => toast.error('Có lỗi xảy ra!');
    const navigate = useNavigate();

    function createPost(values) {
        setLoading(true);
        console.log(values);
        fetch('http://localhost:5000/api/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    setLoading(false);
                    showSuccessNoti();
                    // setTimeout(() => {
                    //     navigate('/admin/product');
                    // }, 4000);
                    // navigate('/admin/product');
                    formik.resetForm();
                } else {
                    setLoading(false);
                    showErorrNoti();
                }
            })
            .catch(() => {
                setLoading(false);
                showErorrNoti();
            });
    }

    const formik = useFormik({
        initialValues: {
            title: '',
            content: '',
            categoryId: '',
        },
        validationSchema,
        onSubmit: createPost,
    });
    const user = useSelector(userSelector);

    const handleChangeContent = useCallback((newContent) => {
        formik.setFieldValue('content', newContent);
    }, []);

    const setTouchContent = useCallback(() => {
        formik.setFieldTouched('content', true);
    }, []);

    return (
        <div className=" ">
            <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-col">
                    {/* LEFT */}
                    <div className="flex">
                        <div className=" grow pr-16">
                            <label className="font-semibold">Tiêu đề</label>
                            <input
                                name="title"
                                type="text"
                                className={clsx('text-input2 mt-1', {
                                    invalid: formik.errors.title && formik.touched.title,
                                })}
                                placeholder="Tiêu đề bài viết"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.title}
                            />
                            <div
                                className={clsx('invisible text-sm', {
                                    '!visible text-red-500': formik.errors.title && formik.touched.title,
                                })}
                            >
                                {formik.errors.title || 'No error message'}
                            </div>
                        </div>
                        {/* RIGHT */}
                        <div>
                            <div className="">
                                <label className="font-semibold">Chủ đề</label>
                                <CategoryInput
                                    name="categoryId"
                                    className={clsx('text-input2 mt-1', {
                                        invalid: formik.errors.categoryId && formik.touched.categoryId,
                                    })}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.categoryId}
                                />
                                <div
                                    className={clsx('invisible text-sm', {
                                        '!visible text-red-500': formik.errors.categoryId && formik.touched.categoryId,
                                    })}
                                >
                                    {formik.errors.categoryId || 'No er'}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className=" ">
                        <label className="font-semibold">Nội dung</label>
                        <div
                            className={clsx('text-editor mt-1 h-96 overflow-scroll rounded-sm ', {
                                'ring-1 ring-red-500': formik.errors.content && formik.touched.content,
                            })}
                        >
                            <PostContentEditor
                                setFormik={handleChangeContent}
                                initValue={formik.initialValues.content}
                                setTouch={setTouchContent}
                            />
                        </div>
                        <div
                            className={clsx('invisible text-sm', {
                                '!visible text-red-500': formik.errors.content && formik.touched.content,
                            })}
                        >
                            {formik.errors.content || 'No er'}
                        </div>
                    </div>
                </div>
                <div className="flex items-center border-t-2 pt-4">
                    <div className="grow"></div>
                    <button
                        type="submit"
                        className={clsx(
                            'flex h-9 min-w-[120px] mr-28 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-white transition hover:bg-primary-dark',
                            {
                                'pointer-events-none opacity-50': !formik.dirty || loading,
                            }
                        )}
                    >
                        <span className="pr-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-6 w-6 pt-0.5"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                        Tạo bài đăng
                    </button>

                    {loading && (
                        <div className="ml-4 flex items-center font-medium text-primary-dark">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-6 w-6 animate-spin"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                                />
                            </svg>
                            <div className="ml-1">Đang tạo bài đăng</div>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}

export default CreatePost;

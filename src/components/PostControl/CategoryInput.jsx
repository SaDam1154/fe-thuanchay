import { useEffect, useRef, useState } from 'react';

function CategoryInput({ ...props }) {
    const [categories, setCategories] = useState([]);
    const selectElem = useRef(null);

    useEffect(() => {
        fetch('http://localhost:5000/api/categories')
            .then((res) => res.json())
            .then((resJson) => {
                if (resJson.success) {
                    console.log(resJson.categories);
                    setCategories(resJson.categories);
                } else {
                    console.log(resJson.categories);
                    setCategories([]);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <select {...props} ref={selectElem}>
            <option value="" disabled>
                -- Chọn chủ đề --
            </option>
            {categories.map((category) => (
                <option key={category._id} value={category._id}>
                    {category.name}
                </option>
            ))}
        </select>
    );
}
export default CategoryInput;

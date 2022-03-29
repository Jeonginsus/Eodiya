import React, { useState, Fragment, useEffect } from 'react';

const Searchbar = (props) => {
    const [inputText, setInputText] = useState("");
    const [place, setplace] = useState(props.setKeyword);

    const onChange = (e) => {
        setInputText(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setplace(inputText);
        setInputText("");
    }
    useEffect(() => {
        console.log("Searchbar : ", place, '로 변경되었음.')
        props.setKeyword(place);
        // return () => {
        //     props.setKeyword(place);
        // };
    }, [place])



    return (
        <Fragment>
            <form className="inputForm" onSubmit={handleSubmit}>
                <input
                    type = "text"
                    placeholder='검색할 내용을 입력해주세요'
                    onChange={onChange}
                    value={inputText}
                >
                </input>
                <button type="submit">검색</button>
            </form>
        </Fragment>
    );
}

export default Searchbar;
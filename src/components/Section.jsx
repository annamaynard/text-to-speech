import '../App.css';

const Section =({text, setText}) => {
    return(
        <div className="section-container">
            <textarea
             value={text}
             onChange={(e) => setText(e.target.value)} />
            <button
            className="btn-convert">Convert to Speech</button>
        </div>

    )
}
export default Section;
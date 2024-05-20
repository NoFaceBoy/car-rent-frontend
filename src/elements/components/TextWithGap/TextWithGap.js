
export default function TextWithGap({ start, end, classesForText = "", classesForGap = ""}) {
    classesForText += " d-flex flex-basis-0 align-items-center";
    return (
        <div className={classesForText}>
            <div>{start}</div>
            <div className={"flex-grow-1 " + classesForGap}/>
            <div className="text-end">{end}</div>
        </div>
    );
}
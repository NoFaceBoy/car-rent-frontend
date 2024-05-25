import TextWithGap from "elements/components/TextWithGap/TextWithGap";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import './CardCard.scss'

function CarCard({data}) {
    const nav = useNavigate();

    if(!data.hasOwnProperty('imageUrls')){
        data.imageUrls = [''];
    }
    return (
        <Card border="primary" className="productCard m-2">

            <Card.Img variant="top" src={data.image} className='rounded' />
            <Card.Title className="text-center">{data.name}</Card.Title>
            <div className="flex-grow-1"/>
            <Card.Text as='div' className="spacingChild">
                <h4>{`${data.brand} ${data.model}`}</h4>
                <TextWithGap start="Mode:" end={`${data.mode.toLowerCase()}`} />
                <TextWithGap start="Status:" end={data.status.toLowerCase()} />
                <TextWithGap classesForText="fw-bolder" start="Price:" end={`$ ${data.price}`} />
            </Card.Text>
            <Button variant="primary" className="my-2" onClick={() => nav(`${data.id}`)}>View More</Button>
        </Card>
    );
}



export default CarCard;
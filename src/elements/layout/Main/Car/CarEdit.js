import CarContext from "data/CarContext";
import {useFormik} from "formik";
import {useContext, useEffect, useState} from "react";
import {Col, Container, Spinner, Form, FloatingLabel, Row, Button, Alert, Toast} from "react-bootstrap";
import {useLoaderData, useNavigate} from "react-router-dom";
import * as Yup from "yup";

function CarEdit() {
    const id = useLoaderData();
    const {getCarById} = useContext(CarContext);
    const [car, setCar] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [isSuccessful, setSuccess] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [otherError, setOtherError] = useState("");
    const navigate = useNavigate();

    const {addCar, updateCar} = useContext(CarContext);
    const loadCar = async () => {
        if (car) {
            setLoading(false);
            return;
        }
        if (!id) {
            setLoading(false);
            return;
        }
        const acar = await getCarById(id);
        setCar(acar);
        setLoading(false);
    }

    const formik = useFormik({
        initialValues: {
            model: (car) ? car.model : '',
            brand: (car) ? car.brand : '',
            year: (car) ? car.year : '',
            price: (car) ? car.price : '',
            image: (car) ? car.image : '',
            status: (car) ? car.status : 'AVALAIBLE',
            mode: (car) ? car.mode : 'STANDARD',
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            model: Yup.string().required(),
            brand: Yup.string().required(),
            year: Yup.number().integer().min(1850).max(2050).required(),
            price: Yup.number().positive().required(),
            image: Yup.string().required(),
            status: Yup.string().required(),
            mode: Yup.string().required(),
        }),
        onSubmit: async () => {
            setIsSaving(true);
            const car_obj = {...formik.values};
            let res;
            if (id) {
                car_obj.id = id;
                res = await updateCar(car_obj);
            } else {
                res = await addCar(car_obj);
            }
            if (isNaN(res)) {
                if (id) {
                    navigate(-1);
                } else {
                    formik.resetForm();
                    setSuccess(true)
                }

            } else {
                setOtherError("Other error");
            }

            setIsSaving(false);
        },

    });

    useEffect(() => {
        loadCar()
    }, []);
    return (
        <Container className="my-2">
            <Toast autohide show={isSuccessful} onClose={() => setSuccess(false)} className="width-20 position-absolute">
                <Toast.Header>
                    Car was successfully added!
                </Toast.Header>
            </Toast>
            {(isLoading)
                ? <Col className='d-flex justify-content-center'><Spinner animation='border'/></Col>
                :
                <Col className='d-flex flex-column align-items-center'>
                    <h3>{(id) ? `Edit the car with id ${id}` : 'Add a new car'}</h3>
                    <FloatingLabel label="Brand" className="width-40 my-2">
                        <Form.Control placeholder="Brand"   {...formik.getFieldProps("brand")} type="brand"
                                      isInvalid={formik.touched.brand && formik.errors.brand}/>
                    </FloatingLabel>
                    <FloatingLabel label="Model" className="width-40 my-2">
                        <Form.Control placeholder="Model"   {...formik.getFieldProps("model")} type="model"
                                      isInvalid={formik.touched.model && formik.errors.model}/>
                    </FloatingLabel>
                    <FloatingLabel label="Year" className="width-40 my-2">
                        <Form.Control placeholder="Year"   {...formik.getFieldProps("year")} type="year"
                                      isInvalid={formik.touched.year && formik.errors.year}/>
                    </FloatingLabel>
                    <FloatingLabel label="Price" className="width-40 my-2">
                        <Form.Control placeholder="Price"   {...formik.getFieldProps("price")} type="price"
                                      isInvalid={formik.touched.price && formik.errors.price}/>
                    </FloatingLabel>
                    <FloatingLabel label="Image url" className="width-40 my-2">
                        <Form.Control as="textarea" rows={4}
                                      placeholder="Image url"   {...formik.getFieldProps("image")} type="image"
                                      isInvalid={formik.touched.image && formik.errors.image}/>
                    </FloatingLabel>
                    <FloatingLabel label="Mode" className="width-40 my-2">
                        <Form.Select label="Select mode" {...formik.getFieldProps("mode")} type="mode"
                                     isInvalid={formik.touched.mode && formik.errors.mode}>
                            <option value="STANDARD">Standard</option>
                            <option value="SPORT">Sport</option>
                            <option value="VINTAGE">Vintage</option>
                            <option value="BUSINESS">Business</option>
                        </Form.Select>
                    </FloatingLabel>
                    <FloatingLabel label="Status" className="width-40 my-2">
                        <Form.Select label="Select status" {...formik.getFieldProps("status")} type="status"
                                     isInvalid={formik.touched.status && formik.errors.status}>
                            <option value="AVALAIBLE">Avalaible</option>
                            <option value="RESERVED">Reserved</option>
                            <option value="DAMAGED">Damaged</option>
                        </Form.Select>
                    </FloatingLabel>
                    <div style={{height: "5rem"}} className="d-flex align-items-center">
                        <Alert variant="danger" className="flex-grow-1" show={otherError !== ""}>{otherError}</Alert>
                    </div>
                    <Button className="width-40" onClick={formik.submitForm}>
                        {(isSaving)
                            ? <div className="position-relative"><Spinner animation="border" size="sm"></Spinner></div>
                            : <>Confirm</>
                        }
                    </Button>
                </Col>
            }
        </Container>
    );
}

export default CarEdit;
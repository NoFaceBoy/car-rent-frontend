import React, { useContext, useEffect, useState } from 'react';
import AuthContext from "../../../../data/AuthContext";
import { getReports } from "../../../../data/carApi";
import { Col, Spinner, Table } from "react-bootstrap";
import './Report.scss';

function Report() {
    const [reportData, setReportData] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        async function loadReport() {
            setLoading(true);
            const result = await getReports(user);
            if (result.status === 200) {
                setReportData(result.data);
            } else {
                console.error("Failed to fetch reports", result);
            }
            setLoading(false);
        }

        loadReport();
    }, [user]);


    const isPrivileged = user !== null && user.privilege_level === "PRIVILEDGED";

    return (
        <div className="container">
            {(isLoading) ? <Col className='d-flex justify-content-center'><Spinner animation='border' /></Col>
                :(!reportData) ? <div>No data available</div>
                    : (isPrivileged) ?
                        <div className="d-flex flex-column align-items-center">
                            <h1>Manager Report</h1>
                            <div className="report-container">
                                {Object.entries(reportData).map(([key, value], index) => (
                                    <div key={key} className="report-item">
                                        <img src={`data:image/png;base64,${value}`} alt={key}/>
                                    </div>
                                ))}
                            </div>
                        </div>

                        :
                        <div className="d-flex flex-column">
                            <h1 className="align-self-center">User Report</h1>
                            {reportData && (
                                <div>
                                    <h4>Top Cars By Reservation</h4>
                                    <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Car</th>
                                            <th>Reservations</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {reportData.top_cars.map((data, index) => (
                                            <tr key={index}>
                                                <td>{data[0].brand} {data[0].model}</td>
                                                <td>{data[1]}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </Table>


                                    <h4>Cars sorted by lowest price</h4>
                                    <Table striped bordered hover>
                                        <thead>
                                        <tr>
                                            <th>Car</th>
                                            <th>Price</th>
                                            <th>Class</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {reportData.cheap_cars.map((car, index) => (
                                            <tr key={`cheap_car_${index}`}>
                                                <td>{car.brand} {car.model}</td>
                                                <td>{car.price}</td>
                                                <td>{car.mode}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </Table>

                                    <h4>Cars sorted by highest price</h4>
                                    <Table striped bordered hover>
                                        <thead>
                                        <tr>
                                            <th>Car</th>
                                            <th>Price</th>
                                            <th>Class</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {reportData.expensive_cars.map((car, index) => (
                                            <tr key={`expensive_car_${index}`}>
                                                <td>{car.brand} {car.model}</td>
                                                <td>{car.price}</td>
                                                <td>{car.mode}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </Table>

                                    <h4>All Cars</h4>
                                    <Table striped bordered hover>
                                        <thead>
                                        <tr>
                                            <th>Car</th>
                                            <th>Price</th>
                                            <th>Class</th>
                                            <th>Status</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {reportData.all_cars.map((car, index) => (
                                            <tr key={`all_car_${index}`}>
                                                <td>{car.brand} {car.model}</td>
                                                <td>${car.price}</td>
                                                <td>{car.mode}</td>
                                                <td>{car.status}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </Table>
                                </div>
                            )}
                        </div>}
        </div>
    );
};

export default Report;

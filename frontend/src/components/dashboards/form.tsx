import {
    faCalendarCheck,
    faPills,
    faUserMd,
    faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Chart from "react-google-charts";
import { StatusCount } from "../../app/models/dashboard";

interface DashboardProps {
  medicos?: number;
  pacientes?: number;
  consultas?: number;
  medicamentos?: number;
  consultas_status?: StatusCount[];
}

export const DashboardForm: React.FC<DashboardProps> = ({
  medicos,
  pacientes,
  consultas,
  medicamentos,
  consultas_status
}) => {

    const chartData = [
        ["Status", "Total"],
        ["Agendada", consultas_status?.find(s => s.status === "1")?.total ?? 0],
        ["Realizada", consultas_status?.find(s => s.status === "2")?.total ?? 0],
        ["Cancelada", consultas_status?.find(s => s.status === "3")?.total ?? 0]
      ];

      const chartOptions = {
        title: "Status das Consultas",
        pieHole: 0.4,
        is3D: true,
        legend: { position: "bottom" },
        colors: ["#8AD1C2", "#9F8AD1", "#D18A99", "#BCD18A", "#D1C28A"]
      };
  return (
    <div className="container mt-4">
      <div className="row g-4">
        <div className="col-md-6 col-xl-3">
          <div className="card bg-danger text-white shadow rounded-3 p-3 h-100">
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faUserMd} size="2x" className="me-3" />
              <div>
                <h5 className="card-title mb-1">Médicos</h5>
                <p className="fs-4 m-0">{medicos ?? 0}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-xl-3">
          <div className="card bg-primary text-white shadow rounded-3 p-3 h-100">
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faUsers} size="2x" className="me-3" />
              <div>
                <h5 className="card-title mb-1">Pacientes</h5>
                <p className="fs-4 m-0">{pacientes ?? 0}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-xl-3">
          <div className="card bg-warning text-dark shadow rounded-3 p-3 h-100">
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faCalendarCheck} size="2x" className="me-3" />
              <div>
                <h5 className="card-title mb-1">Consultas</h5>
                <p className="fs-4 m-0">{consultas ?? 0}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-xl-3">
          <div className="card bg-success text-white shadow rounded-3 p-3 h-100">
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faPills} size="2x" className="me-3" />
              <div>
                <h5 className="card-title mb-1">Medicamentos</h5>
                <p className="fs-4 m-0">{medicamentos ?? 0}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <Chart
            chartType="PieChart"
            width="100%"
            height="400px"
            data={chartData}
            options={chartOptions}
        />
        </div>

    </div>
  );
};

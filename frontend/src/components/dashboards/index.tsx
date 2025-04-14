import React, { useEffect, useState } from "react";
import { DashboardData } from "../../app/models/dashboard";
import { useDashboardService } from "../../app/services/dashboard.service";
import { Layout } from "../layout";
import { Loader } from "../loader";
import { DashboardForm } from "./form";

export const Dashboard: React.FC = () => {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const service = useDashboardService();
    console.log(dashboard)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await service.get();
        setDashboard(data);
      } catch (error) {
        console.error("Erro ao buscar dados do dashboard:", error);
      }
    };

    fetchData();
  }, []);

 
  return (
    <Layout
      titulo="Dashboards"
      tittleClassName="h1 display-6 fw-bold text-primary mt-4 text-center"
    >
      <Loader show={!dashboard}/>
      {
        dashboard &&
        (
          
          <DashboardForm
            medicamentos={dashboard.medicamentos}
            pacientes={dashboard.pacientes}
            medicos={dashboard.medicos}
            consultas={dashboard.consultas}
            consultas_status={dashboard.consultas_status}
          />
        )
      }
    
    </Layout>
  );
};

export interface StatusCount {
   status: string;
   total: number;
 }
 
 export interface DashboardData {
   medicos?: number;
   pacientes?: number;
   medicamentos?: number;
   consultas?: number;
   consultas_status?: StatusCount[];
 }
 
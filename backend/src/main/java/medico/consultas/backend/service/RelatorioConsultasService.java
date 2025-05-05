package medico.consultas.backend.service;

import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;



@Service
public class RelatorioConsultasService {
	@Value("classpath:reports/relatorio_consultas.jrxml")
	private Resource relatorioConsultas;
	
	@Autowired
	private DataSource dataSource;
	public byte[] gerarRelatorio(Date dataInicio,Date dataFim)
	{
		try(Connection connection = dataSource.getConnection()) {
			JasperReport compileReport = JasperCompileManager.
					compileReport(relatorioConsultas.getInputStream());
			
			Map<String, Object> parametros = new HashMap<>();
	
			parametros.put("DATA_INICIO", dataInicio);
			parametros.put("DATA_FIM",dataFim);
			
			JasperPrint print = JasperFillManager.fillReport(compileReport, parametros,connection);
			
			return JasperExportManager.exportReportToPdf(print);
		
		} catch (SQLException e) {
			e.printStackTrace();
		}
		catch(JRException e)
		{
			e.printStackTrace();
		}
		catch (IOException e) {
			e.printStackTrace();
		}
		
		return null;
	}
}

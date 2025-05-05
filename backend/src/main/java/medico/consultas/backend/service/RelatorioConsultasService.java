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
	public byte[] gerarRelatorio(Date dataInicio, Date dataFim) {
		System.out.println("Iniciando geração do relatório...");
		System.out.println("Data Início: " + dataInicio);
		System.out.println("Data Fim: " + dataFim);

		try (Connection connection = dataSource.getConnection()) {
			System.out.println("Conexão com o banco de dados estabelecida.");

			if (!relatorioConsultas.exists()) {
				System.out.println("Arquivo de relatório não encontrado.");
				return null;
			} else {
				System.out.println("Arquivo de relatório encontrado: " + relatorioConsultas.getFilename());
			}

			JasperReport compileReport = JasperCompileManager.compileReport(relatorioConsultas.getInputStream());
			System.out.println("Relatório compilado com sucesso.");

			Map<String, Object> parametros = new HashMap<>();
			parametros.put("DATA_INICIO", dataInicio);
			parametros.put("DATA_FIM", dataFim);
			System.out.println("Parâmetros adicionados ao relatório.");

			JasperPrint print = JasperFillManager.fillReport(compileReport, parametros, connection);
			System.out.println("Relatório preenchido com dados.");

			byte[] pdf = JasperExportManager.exportReportToPdf(print);
			System.out.println("Relatório exportado para PDF com sucesso.");

			return pdf;

		} catch (SQLException e) {
			System.out.println("Erro de SQL ao gerar o relatório:");
			e.printStackTrace();
		} catch (JRException e) {
			System.out.println("Erro do JasperReports ao gerar o relatório:");
			e.printStackTrace();
		} catch (IOException e) {
			System.out.println("Erro de IO ao acessar o arquivo do relatório:");
			e.printStackTrace();
		}

		System.out.println("Falha ao gerar o relatório. Retornando null.");
		return null;
	}
}

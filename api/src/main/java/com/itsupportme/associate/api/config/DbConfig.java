package com.itsupportme.associate.api.config;

import com.itsupportme.associate.api.component.PropertyLoader;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.TransactionManagementConfigurer;
import org.vibur.dbcp.ViburDBCPDataSource;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import java.util.Properties;

@Configuration
@EnableTransactionManagement(proxyTargetClass = true)
@EnableJpaRepositories(
        basePackages = {
                "com.itsupportme.associate.entity.repository"
        }
)
public class DbConfig implements TransactionManagementConfigurer {

    @Bean
    public DataSource dataSource() {

        Properties properties = PropertyLoader.load("database.properties");

        ViburDBCPDataSource ds = new ViburDBCPDataSource();

        ds.setDriverClassName(properties.getProperty("jdbc.driverClassName"));
        ds.setJdbcUrl(properties.getProperty("jdbc.url"));
        ds.setUsername(properties.getProperty("jdbc.username"));
        ds.setPassword(properties.getProperty("jdbc.password"));

        ds.setPoolInitialSize(10);
        ds.setPoolMaxSize(100);

        ds.setConnectionIdleLimitInSeconds(30);
        ds.setTestConnectionQuery("isValid");

        ds.setLogQueryExecutionLongerThanMs(500);
        ds.setLogStackTraceForLongQueryExecution(true);

        ds.setStatementCacheMaxSize(200);

        ds.start();

        return ds;
    }

    @Bean
    public EntityManagerFactory entityManagerFactory() {

        Properties properties                   = PropertyLoader.load("hibernate.properties");
        HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();

        vendorAdapter.setGenerateDdl(true);

        LocalContainerEntityManagerFactoryBean factory = new LocalContainerEntityManagerFactoryBean();

        factory.setJpaVendorAdapter(vendorAdapter);
        factory.setPackagesToScan("com.itsupportme.associate.entity");
        factory.setDataSource(dataSource());
        factory.setJpaProperties(properties);
        factory.afterPropertiesSet();

        return factory.getObject();
    }

    @Override
    @Bean(name = "transactionManager")
    public PlatformTransactionManager annotationDrivenTransactionManager() {
        JpaTransactionManager txManager = new JpaTransactionManager();
        txManager.setEntityManagerFactory(entityManagerFactory());

        return txManager;
    }
}

package com.mycompany.myservice.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.zalando.problem.spring.web.advice.security.SecurityProblemSupport;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@Import(SecurityProblemSupport.class)
@Order(1000)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    TokenHelper tokenHelper;

    @Autowired
    SecurityProblemSupport problemSupport;

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .exceptionHandling()
                //.authenticationEntryPoint( restAuthenticationEntryPoint )
                .authenticationEntryPoint(problemSupport)
                .accessDeniedHandler(problemSupport)
                .and()
                .authorizeRequests()
                .antMatchers("/api/auth/**").permitAll()
                //.antMatchers(HttpMethod.POST,"/users").hasAnyRole("USER", "ADMIN")
                //.anyRequest().authenticated()
                .and()
                .addFilterBefore(
                        new TokenAuthenticationFilter(tokenHelper, userDetailsService),
                        BasicAuthenticationFilter.class);

        http
                .csrf()
                // .ignoringAntMatchers("/h2-console/**")//don't apply CSRF protection to /h2-console
                .disable()
                .headers()
                .frameOptions().sameOrigin() // allow use of frame to same origin urls
        ;
    }


    @Override
    public void configure(WebSecurity web) {
        web.ignoring().antMatchers(
                "/static/**",
                "/js/**",
                "/css/**",
                "/images/**",
                "/favicon.ico"
        );

    }
}
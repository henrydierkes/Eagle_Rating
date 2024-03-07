package com.astar.ratingbackend.Config;

import org.springframework.context.annotation.Configuration;
import springfox.documentation.swagger2.annotations.EnableSwagger2WebMvc;


@Configuration
@EnableSwagger2WebMvc
public class Swagger2Config {
//
//    private ApiInfo adminApiInfo() {
//        return new ApiInfoBuilder()
//                .title("EagleRating API Doc")
//                .description("this documents provides info about our api")
//                .version("1.0")
//                .contact(new Contact("Jonathan", "https://github.com/", "rwan388@emory.edu"))
//                .build();
//    }
//
//    private ApiInfo webApiInfo() {
//        return new ApiInfoBuilder()
//                .title("EagleRating API Doc")
//                .description("this documents provides info about our api")
//                .version("1.0")
//                .contact(new Contact("Jonathan", "https://github.com/", "rwan388@emory.edu"))
//                .build();
//    }
//
//    /**
//     * 第一组：api
//     * @return
//     */
//    @Bean
//    public Docket webApiConfig() {
//        List<Parameter> pars = new ArrayList<>();
//        ParameterBuilder tokenPar = new ParameterBuilder();
//        tokenPar.name("userId")
//                .description("用户token")
//                //.defaultValue(JwtHelper.createToken(1L, "admin"))
//                .defaultValue("1")
//                .modelRef(new ModelRef("string"))
//                .parameterType("header")
//                .required(false)
//                .build();
//        pars.add(tokenPar.build());
//
//        Docket webApi = new Docket(DocumentationType.SWAGGER_2)
//                .groupName("Client API")
//                .apiInfo(webApiInfo())
//                .select()
//                .apis(RequestHandlerSelectors.basePackage("com.eric.springbootknife4j"))
//                .paths(PathSelectors.regex("/api/.*"))
//                .build()
//                .globalOperationParameters(pars);
//        return webApi;
//    }
//
//    /**
//     * 第二组：admin
//     * @return
//     */
//    @Bean
//    public Docket adminApiConfig() {
//        List<Parameter> pars = new ArrayList<>();
//        ParameterBuilder tokenPar = new ParameterBuilder();
//        tokenPar.name("adminId")
//                .description("user token")
//                .defaultValue("1")
//                .modelRef(new ModelRef("string"))
//                .parameterType("header")
//                .required(false)
//                .build();
//        pars.add(tokenPar.build());
//
//        Docket adminApi = new Docket(DocumentationType.SWAGGER_2)
//                .groupName("后台接口")
//                .apiInfo(adminApiInfo())
//                .select()
//                //只显示admin路径下的页面
//                .apis(RequestHandlerSelectors.basePackage("com.eric.springbootknife4j"))
//                .paths(PathSelectors.regex("/admin/.*"))
//                .build()
//                .globalOperationParameters(pars);
//        return adminApi;
//    }

}


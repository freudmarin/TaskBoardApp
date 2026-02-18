package com.taskboard.security;

import org.springframework.security.test.context.support.WithSecurityContext;

import java.lang.annotation.*;

/**
 * Custom annotation to inject a UserPrincipal into the security context for testing.
 * Usage: @WithMockUserPrincipal(id = 1L, username = "testuser", roles = {"USER"})
 */
@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
@WithSecurityContext(factory = WithMockUserPrincipalSecurityContextFactory.class)
public @interface WithMockUserPrincipal {

    long id() default 1L;

    String username() default "testuser";

    String email() default "test@example.com";

    String password() default "password";

    boolean active() default true;

    String[] roles() default {"USER"};
}


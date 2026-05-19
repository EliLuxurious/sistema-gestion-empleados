package com.unas.backend.repository;

import com.unas.backend.entidad.Empleado;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EmpleadoRepository extends JpaRepository<Empleado, Long> {

    @Query("SELECT e FROM Empleado e WHERE " +
            "LOWER(e.nombre) LIKE LOWER(CONCAT('%', :texto, '%')) OR " +
            "LOWER(e.apellido) LIKE LOWER(CONCAT('%', :texto, '%')) OR " +
            "e.dni LIKE CONCAT('%', :texto, '%')")
    List<Empleado> buscar(@Param("texto") String texto);
}
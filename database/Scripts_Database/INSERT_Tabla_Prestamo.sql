Use Biblioteca

INSERT INTO Prestamo (IdUsuario, IdLibro, FechaPrestamo, FechaDevolucion) VALUES (3, 1, '2025-05-01', NULL);
INSERT INTO Prestamo (IdUsuario, IdLibro, FechaPrestamo, FechaDevolucion) VALUES (5, 2, '2025-05-02', NULL);
INSERT INTO Prestamo (IdUsuario, IdLibro, FechaPrestamo, FechaDevolucion) VALUES (1, 3, '2025-05-03', NULL);
INSERT INTO Prestamo (IdUsuario, IdLibro, FechaPrestamo, FechaDevolucion) VALUES (8, 4, '2025-05-04', NULL);
INSERT INTO Prestamo (IdUsuario, IdLibro, FechaPrestamo, FechaDevolucion) VALUES (6, 5, '2025-05-05', NULL);
INSERT INTO Prestamo (IdUsuario, IdLibro, FechaPrestamo, FechaDevolucion) VALUES (2, 6, '2025-05-06', NULL);
INSERT INTO Prestamo (IdUsuario, IdLibro, FechaPrestamo, FechaDevolucion) VALUES (10, 7, '2025-05-07', NULL);
INSERT INTO Prestamo (IdUsuario, IdLibro, FechaPrestamo, FechaDevolucion) VALUES (4, 8, '2025-05-08', NULL);
INSERT INTO Prestamo (IdUsuario, IdLibro, FechaPrestamo, FechaDevolucion) VALUES (1, 9, '2025-05-09', NULL);
INSERT INTO Prestamo (IdUsuario, IdLibro, FechaPrestamo, FechaDevolucion) VALUES (9, 10, '2025-05-10', NULL);

UPDATE Libro
SET Disponibilidad = 0
WHERE IdLibro IN (1,2,3,4,5,6,7,8,9,10);



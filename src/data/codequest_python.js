// HACKFORGE - CodeQuest Python Path
// 5 Mundos, 20 niveles cada uno, desafío de código al final de cada mundo

export const PYTHON_PATH = {
  id: "python",
  nombre: "Python",
  icon: "🐍",
  color: "#f7c948",
  descripcion: "De cero a programador. Aprende Python desde variables hasta proyectos reales.",
  mundos: [
    {
      id: 1,
      nombre: "Fundamentos",
      icon: "🌱",
      color: "#22c55e",
      descripcion: "Variables, tipos de datos, print e input. Tu primer programa.",
      niveles: [
        {
          id: "py-1-1",
          titulo: "¿Qué es Python?",
          teoria: "Python es un lenguaje de programación creado en 1991. Es uno de los más usados en el mundo — se usa para crear páginas web, inteligencia artificial, automatización, hacking y mucho más.\n\nLo mejor: la sintaxis es muy cercana al inglés, lo que lo hace fácil de aprender.",
          ejemplo: {
            codigo: '# Esto es un comentario — Python lo ignora\nprint("Hola, mundo!")\nprint("Bienvenido a CodeQuest")',
            output: 'Hola, mundo!\nBienvenido a CodeQuest'
          },
          pregunta: "¿Cuál es la función que imprime texto en pantalla?",
          opciones: ["write()", "print()", "show()", "echo()"],
          correcta: 1,
          explicacion: "print() es la función básica de Python para mostrar texto en pantalla. Todo lo que pongas dentro de los paréntesis y entre comillas se mostrará."
        },
        {
          id: "py-1-2",
          titulo: "Variables",
          teoria: "Una variable es un contenedor que guarda información. Piénsala como una caja con un nombre donde guardas algo.\n\nEn Python no necesitas declarar el tipo — simplemente asignas un valor con el signo igual (=).",
          ejemplo: {
            codigo: 'nombre = "Ana"\nedad = 25\nciudad = "Santiago"\n\nprint(nombre)\nprint(edad)\nprint(ciudad)',
            output: 'Ana\n25\nSantiago'
          },
          pregunta: "¿Cuál es la forma correcta de crear una variable en Python?",
          opciones: ["var nombre = 'Ana'", "nombre := 'Ana'", "nombre = 'Ana'", "string nombre = 'Ana'"],
          correcta: 2,
          explicacion: "En Python solo necesitas escribir el nombre de la variable, el signo = y el valor. Sin 'var', sin tipos, sin punto y coma."
        },
        {
          id: "py-1-3",
          titulo: "Tipos de datos",
          teoria: "Python tiene varios tipos de datos básicos:\n\n• str → texto (string): 'Hola', 'Python'\n• int → número entero: 42, -10, 0\n• float → número decimal: 3.14, -0.5\n• bool → verdadero o falso: True, False",
          ejemplo: {
            codigo: 'texto = "Hola"      # str\nnumero = 42         # int\ndecimal = 3.14      # float\nverdad = True       # bool\n\nprint(type(texto))\nprint(type(numero))\nprint(type(decimal))',
            output: "<class 'str'>\n<class 'int'>\n<class 'float'>"
          },
          pregunta: "¿Qué tipo de dato es el valor 3.14?",
          opciones: ["int", "str", "float", "bool"],
          correcta: 2,
          explicacion: "3.14 es un número decimal, por lo tanto es de tipo float. Los enteros como 3 o 42 son int, el texto es str, y True/False son bool."
        },
        {
          id: "py-1-4",
          titulo: "print() avanzado",
          teoria: "print() puede hacer más que solo mostrar texto. Puedes:\n\n• Combinar variables con texto usando comas\n• Usar f-strings para insertar variables dentro del texto\n• Imprimir múltiples cosas en una línea",
          ejemplo: {
            codigo: 'nombre = "Carlos"\nedad = 20\n\n# Con coma:\nprint("Nombre:", nombre, "Edad:", edad)\n\n# Con f-string (más moderno):\nprint(f"Me llamo {nombre} y tengo {edad} años")',
            output: 'Nombre: Carlos Edad: 20\nMe llamo Carlos y tengo 20 años'
          },
          pregunta: "¿Cuál es la sintaxis correcta de un f-string?",
          opciones: ['print("Hola " + nombre)', 'print(f"Hola {nombre}")', 'print("Hola $nombre")', 'print("Hola %nombre")'],
          correcta: 1,
          explicacion: "Los f-strings se escriben con una f antes de las comillas y las variables van entre llaves {}. Son la forma más moderna y legible de combinar texto y variables."
        },
        {
          id: "py-1-5",
          titulo: "input() — Pedir datos al usuario",
          teoria: "input() permite que el usuario escriba algo y tú lo guardes en una variable. El programa se pausa hasta que el usuario presiona Enter.\n\nImportante: input() siempre devuelve texto (str), incluso si el usuario escribe un número.",
          ejemplo: {
            codigo: 'nombre = input("¿Cómo te llamas? ")\nprint(f"¡Hola, {nombre}!")',
            output: '¿Cómo te llamas? [el usuario escribe: Pedro]\n¡Hola, Pedro!'
          },
          pregunta: "¿Qué tipo de dato devuelve input() siempre?",
          opciones: ["int", "float", "bool", "str"],
          correcta: 3,
          explicacion: "input() siempre devuelve str (texto), sin importar lo que escriba el usuario. Si necesitas un número, debes convertirlo con int() o float()."
        },
        {
          id: "py-1-6",
          titulo: "Operadores aritméticos",
          teoria: "Python puede hacer matemáticas:\n\n• + → suma\n• - → resta\n• * → multiplicación\n• / → división (resultado decimal)\n• // → división entera\n• % → módulo (resto de la división)\n• ** → potencia",
          ejemplo: {
            codigo: 'a = 10\nb = 3\n\nprint(a + b)   # 13\nprint(a - b)   # 7\nprint(a * b)   # 30\nprint(a / b)   # 3.333...\nprint(a // b)  # 3\nprint(a % b)   # 1\nprint(a ** b)  # 1000',
            output: '13\n7\n30\n3.3333333333333335\n3\n1\n1000'
          },
          pregunta: "¿Qué operador calcula el RESTO de una división?",
          opciones: ["//", "/", "%", "**"],
          correcta: 2,
          explicacion: "El operador % (módulo) devuelve el resto de la división. Por ejemplo, 10 % 3 = 1 porque 10 = 3×3 + 1. Es muy útil para saber si un número es par (n % 2 == 0)."
        },
        {
          id: "py-1-7",
          titulo: "Conversión de tipos",
          teoria: "A veces necesitas cambiar un dato de un tipo a otro:\n\n• int() → convierte a entero\n• float() → convierte a decimal\n• str() → convierte a texto\n• bool() → convierte a booleano\n\nEsto es especialmente importante cuando usas input().",
          ejemplo: {
            codigo: 'edad_texto = input("Tu edad: ")  # devuelve str\nedad = int(edad_texto)           # convertimos a int\n\nprint(f"El año que viene tendrás {edad + 1} años")',
            output: 'Tu edad: [usuario escribe: 20]\nEl año que viene tendrás 21 años'
          },
          pregunta: "Si el usuario escribe '25' con input(), ¿cómo lo conviertes a número entero?",
          opciones: ["number('25')", "integer('25')", "int('25')", "to_int('25')"],
          correcta: 2,
          explicacion: "int() convierte un string a número entero. Si intentas hacer operaciones matemáticas con el resultado de input() sin convertirlo, Python dará error."
        },
        {
          id: "py-1-8",
          titulo: "Operadores de comparación",
          teoria: "Estos operadores comparan dos valores y devuelven True o False:\n\n• == → igual a\n• != → distinto de\n• > → mayor que\n• < → menor que\n• >= → mayor o igual\n• <= → menor o igual",
          ejemplo: {
            codigo: 'a = 10\nb = 5\n\nprint(a == b)   # False\nprint(a != b)   # True\nprint(a > b)    # True\nprint(a < b)    # False\nprint(a >= 10)  # True',
            output: 'False\nTrue\nTrue\nFalse\nTrue'
          },
          pregunta: "¿Qué operador comprueba si dos valores son IGUALES?",
          opciones: ["=", "===", "==", "eq"],
          correcta: 2,
          explicacion: "== compara si dos valores son iguales. No confundas con = que asigna un valor a una variable. Un solo = es asignación, doble == es comparación."
        },
        {
          id: "py-1-9",
          titulo: "Operadores lógicos",
          teoria: "Los operadores lógicos combinan condiciones:\n\n• and → ambas condiciones deben ser True\n• or → al menos una debe ser True\n• not → invierte el resultado",
          ejemplo: {
            codigo: 'edad = 20\ntiene_id = True\n\n# and: ambas deben ser True\nprint(edad >= 18 and tiene_id)  # True\n\n# or: al menos una True\nprint(edad < 18 or tiene_id)    # True\n\n# not: invierte\nprint(not tiene_id)             # False',
            output: 'True\nTrue\nFalse'
          },
          pregunta: "¿Qué devuelve: True and False?",
          opciones: ["True", "False", "None", "Error"],
          correcta: 1,
          explicacion: "and requiere que AMBAS condiciones sean True. Como una es False, el resultado es False. Es como decir 'esto Y aquello' — si uno falla, todo falla."
        },
        {
          id: "py-1-10",
          titulo: "Strings — Texto avanzado",
          teoria: "Los strings tienen muchos métodos útiles:\n\n• .upper() → mayúsculas\n• .lower() → minúsculas\n• .len() → longitud\n• .strip() → elimina espacios\n• .replace() → reemplaza texto\n• .split() → divide en lista",
          ejemplo: {
            codigo: 'texto = "  Hola Mundo  "\n\nprint(texto.upper())\nprint(texto.lower())\nprint(texto.strip())\nprint(len("Python"))\nprint("Hola".replace("Hola", "Adiós"))',
            output: '  HOLA MUNDO  \n  hola mundo  \nHola Mundo\n6\nAdiós'
          },
          pregunta: "¿Qué método convierte un string a MAYÚSCULAS?",
          opciones: [".upper()", ".caps()", ".UPPER()", ".toUpper()"],
          correcta: 0,
          explicacion: ".upper() convierte todo el string a mayúsculas. Su opuesto es .lower() para minúsculas. Estos métodos no modifican el string original, devuelven uno nuevo."
        },
        {
          id: "py-1-11",
          titulo: "Indexación de strings",
          teoria: "Puedes acceder a caracteres individuales de un string usando índices entre corchetes [].\n\nEl primer carácter tiene índice 0. Los índices negativos cuentan desde el final.",
          ejemplo: {
            codigo: 'texto = "Python"\n\nprint(texto[0])   # P\nprint(texto[1])   # y\nprint(texto[-1])  # n (último)\nprint(texto[-2])  # o\nprint(texto[0:3]) # Pyt (slice)',
            output: 'P\ny\nn\no\nPyt'
          },
          pregunta: "Si texto = 'Hacker', ¿qué devuelve texto[0]?",
          opciones: ["r", "Hacker", "H", "a"],
          correcta: 2,
          explicacion: "Los índices en Python empiezan en 0. texto[0] devuelve el primer carácter, texto[1] el segundo, y así. texto[-1] devuelve el último carácter."
        },
        {
          id: "py-1-12",
          titulo: "Múltiples variables",
          teoria: "Python permite asignar múltiples variables en una línea, e intercambiar valores de forma elegante sin variable temporal.",
          ejemplo: {
            codigo: '# Asignación múltiple:\nx, y, z = 1, 2, 3\nprint(x, y, z)\n\n# Intercambio de valores:\na = 10\nb = 20\na, b = b, a\nprint(a, b)\n\n# Misma variable:\nq = w = e = 0\nprint(q, w, e)',
            output: '1 2 3\n20 10\n0 0 0'
          },
          pregunta: "¿Qué imprime este código?\nx, y = 5, 10\nx, y = y, x\nprint(x, y)",
          opciones: ["5 10", "10 5", "10 10", "5 5"],
          correcta: 1,
          explicacion: "Python intercambia los valores: x toma el valor de y (10) e y toma el valor de x (5). El resultado es x=10, y=5, por eso imprime '10 5'."
        },
        {
          id: "py-1-13",
          titulo: "Constantes y convenciones",
          teoria: "En Python hay convenciones de nomenclatura:\n\n• snake_case → para variables y funciones: mi_variable\n• MAYUSCULAS → para constantes: PI = 3.14159\n• CamelCase → para clases: MiClase\n\nLos comentarios van con # y son ignorados por Python.",
          ejemplo: {
            codigo: '# Constante (por convención)\nPI = 3.14159\nMAX_INTENTOS = 3\n\n# Variable normal\nnombre_usuario = "w4ld0"\nedge_count = 42\n\nprint(f"Pi es: {PI}")\nprint(f"Intentos máximos: {MAX_INTENTOS}")',
            output: 'Pi es: 3.14159\nIntentos máximos: 3'
          },
          pregunta: "¿Cuál es la convención correcta para una variable en Python?",
          opciones: ["miVariable", "mi_variable", "MiVariable", "MIVARIABLE"],
          correcta: 1,
          explicacion: "Python usa snake_case para variables y funciones: palabras en minúscula separadas por guión bajo. CamelCase se usa para clases y MAYUSCULAS para constantes."
        },
        {
          id: "py-1-14",
          titulo: "None — El valor vacío",
          teoria: "None es un valor especial en Python que representa 'nada' o 'sin valor'. Es diferente a 0, False o string vacío.\n\nSe usa para indicar que una variable no tiene valor aún, o que una función no devuelve nada.",
          ejemplo: {
            codigo: 'resultado = None\n\nprint(resultado)          # None\nprint(resultado == None)  # True\nprint(resultado is None)  # True (mejor forma)\n\n# Verificar si tiene valor:\nif resultado is None:\n    print("No hay resultado aún")',
            output: 'None\nTrue\nTrue\nNo hay resultado aún'
          },
          pregunta: "¿Cuál es la forma correcta de verificar si una variable es None?",
          opciones: ["var == null", "var == None", "var is None", "var is null"],
          correcta: 2,
          explicacion: "En Python se usa 'is None' para verificar si algo es None. Aunque '== None' también funciona, 'is None' es la forma idiomática y recomendada."
        },
        {
          id: "py-1-15",
          titulo: "Errores comunes",
          teoria: "Python tiene tipos de errores específicos:\n\n• SyntaxError → error de escritura del código\n• NameError → variable no definida\n• TypeError → tipo de dato incorrecto\n• ZeroDivisionError → división entre cero\n• IndentationError → indentación incorrecta",
          ejemplo: {
            codigo: '# TypeError:\n# print("Hola" + 5)  # Error!\nprint("Hola" + str(5))  # Correcto\n\n# ZeroDivisionError:\n# print(10 / 0)  # Error!\ndivisor = 0\nif divisor != 0:\n    print(10 / divisor)\nelse:\n    print("No se puede dividir por cero")',
            output: 'Hola5\nNo se puede dividir por cero'
          },
          pregunta: "¿Qué error produce intentar sumar un string con un número sin convertir?",
          opciones: ["SyntaxError", "NameError", "TypeError", "ValueError"],
          correcta: 2,
          explicacion: "TypeError ocurre cuando usas un tipo de dato incorrecto. No puedes sumar 'Hola' + 5 directamente — debes convertir el número a string: 'Hola' + str(5)."
        },
        {
          id: "py-1-16",
          titulo: "Operadores de asignación",
          teoria: "Los operadores de asignación combinan una operación con la asignación:\n\n• += → suma y asigna\n• -= → resta y asigna\n• *= → multiplica y asigna\n• /= → divide y asigna\n• //= → división entera y asigna\n• %= → módulo y asigna",
          ejemplo: {
            codigo: 'puntos = 100\n\npuntos += 50   # puntos = puntos + 50\nprint(puntos)  # 150\n\npuntos -= 20\nprint(puntos)  # 130\n\npuntos *= 2\nprint(puntos)  # 260',
            output: '150\n130\n260'
          },
          pregunta: "Si x = 10 y ejecutas x += 5, ¿cuánto vale x?",
          opciones: ["5", "10", "15", "50"],
          correcta: 2,
          explicacion: "x += 5 es lo mismo que x = x + 5. Toma el valor actual de x (10), le suma 5, y guarda el resultado (15) en x."
        },
        {
          id: "py-1-17",
          titulo: "Strings multilínea",
          teoria: "Para strings que ocupan múltiples líneas, usa triple comillas (''' o \"\"\").\n\nTambién puedes usar \\n dentro de un string normal para hacer salto de línea, y \\ para otros caracteres especiales.",
          ejemplo: {
            codigo: '# Triple comillas:\nmensaje = """\nBienvenido a HACKFORGE.\nEste es un mensaje\nmultilínea.\n"""\nprint(mensaje)\n\n# Caracteres especiales:\nprint("Primera línea\\nSegunda línea")\nprint("Tab:\\taquí")',
            output: '\nBienvenido a HACKFORGE.\nEste es un mensaje\nmultilínea.\n\nPrimera línea\nSegunda línea\nTab:\taquí'
          },
          pregunta: "¿Qué carácter especial representa un salto de línea dentro de un string?",
          opciones: ["\\t", "\\n", "\\r", "\\s"],
          correcta: 1,
          explicacion: "\\n es el carácter de nueva línea (newline). \\t es tabulación, \\r es retorno de carro. Estos se llaman secuencias de escape."
        },
        {
          id: "py-1-18",
          titulo: "Entrada de datos múltiple",
          teoria: "Puedes pedir varios datos al usuario y procesarlos. Combinando input(), int(), float() y f-strings puedes crear programas interactivos completos.",
          ejemplo: {
            codigo: 'nombre = input("Nombre: ")\nedad = int(input("Edad: "))\naltura = float(input("Altura en metros: "))\n\nprint(f"\\n--- Perfil ---")\nprint(f"Nombre: {nombre}")\nprint(f"Edad: {edad} años")\nprint(f"Altura: {altura}m")\nprint(f"Año de nacimiento: {2024 - edad}")',
            output: 'Nombre: [Ana]\nEdad: [22]\nAltura en metros: [1.65]\n\n--- Perfil ---\nNombre: Ana\nEdad: 22 años\nAltura: 1.65m\nAño de nacimiento: 2002'
          },
          pregunta: "¿Cómo pides al usuario un número DECIMAL?",
          opciones: ["int(input('Valor: '))", "float(input('Valor: '))", "decimal(input('Valor: '))", "double(input('Valor: '))"],
          correcta: 1,
          explicacion: "float(input('Valor: ')) convierte la entrada del usuario a un número decimal. int() solo acepta enteros, y decimal()/double() no existen en Python."
        },
        {
          id: "py-1-19",
          titulo: "Operaciones con strings",
          teoria: "Los strings se pueden multiplicar y concatenar:\n\n• + → une dos strings\n• * → repite un string N veces\n• in → verifica si un substring está dentro\n• not in → verifica si NO está",
          ejemplo: {
            codigo: 'saludo = "Hola"\nnombre = "Mundo"\n\nprint(saludo + " " + nombre)  # concatenación\nprint("=" * 20)               # repetición\nprint("Ho" in saludo)         # True\nprint("xyz" in saludo)        # False\nprint("xyz" not in saludo)    # True',
            output: 'Hola Mundo\n====================\nTrue\nFalse\nTrue'
          },
          pregunta: "¿Qué imprime print('Ha' * 3)?",
          opciones: ["Ha Ha Ha", "HaHaHa", "Ha3", "Error"],
          correcta: 1,
          explicacion: "El operador * en strings repite el string N veces sin espacios. 'Ha' * 3 produce 'HaHaHa'. Para agregar espacios deberías hacer ('Ha ' * 3).strip()."
        },
        {
          id: "py-1-20",
          titulo: "Resumen Mundo 1",
          teoria: "¡Completaste el Mundo 1! Repasemos lo que aprendiste:\n\n✅ print() e input()\n✅ Variables y tipos (str, int, float, bool)\n✅ Operadores aritméticos y de comparación\n✅ Operadores lógicos (and, or, not)\n✅ Métodos de strings\n✅ Conversión de tipos\n✅ f-strings\n\nAhora viene el DESAFÍO — deberás escribir código real para demostrar lo que aprendiste.",
          ejemplo: {
            codigo: '# Todo lo que aprendiste en acción:\nnombre = input("¿Nombre? ")\nedad = int(input("¿Edad? "))\n\nxp = edad * 10\nnivel = "Principiante" if xp < 300 else "Intermedio"\n\nprint(f"\\n◈ PERFIL HACKFORGE")\nprint("=" * 25)\nprint(f"Operador: {nombre.upper()}")\nprint(f"Edad: {edad}")\nprint(f"XP inicial: {xp}")\nprint(f"Nivel: {nivel}")',
            output: '¿Nombre? [w4ld0]\n¿Edad? [22]\n\n◈ PERFIL HACKFORGE\n=========================\nOperador: W4LD0\nEdad: 22\nXP inicial: 220\nNivel: Principiante'
          },
          pregunta: "¿Qué hace f\"{nombre.upper()}\" en un f-string?",
          opciones: [
            "Imprime la variable nombre tal cual",
            "Imprime nombre en MAYÚSCULAS",
            "Da error porque no se pueden usar métodos en f-strings",
            "Imprime el tipo de la variable"
          ],
          correcta: 1,
          explicacion: "Dentro de un f-string puedes usar métodos directamente sobre las variables. {nombre.upper()} llama al método upper() sobre nombre y muestra el resultado en mayúsculas."
        }
      ],
      desafio: {
        titulo: "Desafío Final — Calculadora de Perfil Hacker",
        descripcion: "Crea un programa que pida al usuario su nombre y año de nacimiento, calcule su edad, y muestre un perfil hacker con su nivel basado en la edad.",
        instrucciones: [
          "Pide el nombre del usuario con input()",
          "Pide el año de nacimiento y conviértelo a int",
          "Calcula la edad restando el año actual (2024) menos el año de nacimiento",
          "Si la edad es menor a 18, el nivel es 'Script Kiddie'",
          "Si tiene entre 18 y 25, el nivel es 'Junior Hacker'",
          "Si tiene más de 25, el nivel es 'Senior Hacker'",
          "Muestra el perfil con nombre en mayúsculas, edad y nivel"
        ],
        solucion: `nombre = input("Nombre de operador: ")
year = int(input("Año de nacimiento: "))
edad = 2024 - year

if edad < 18:
    nivel = "Script Kiddie"
elif edad <= 25:
    nivel = "Junior Hacker"
else:
    nivel = "Senior Hacker"

print(f"\\n◈ PERFIL HACKFORGE")
print("=" * 25)
print(f"Operador: {nombre.upper()}")
print(f"Edad: {edad}")
print(f"Nivel: {nivel}")`,
        test: (codigo) => {
          return codigo.includes("input") &&
                 codigo.includes("int") &&
                 (codigo.includes("if") || codigo.includes("elif")) &&
                 codigo.includes("print") &&
                 (codigo.includes("upper()") || codigo.includes("nombre"));
        }
      }
    },
{
  id: 2,
  nombre: "Control de Flujo",
  icon: "🔀",
  color: "#3b82f6",
  descripcion: "if/else, while, for. Haz que tu programa tome decisiones.",
  bloqueado: false,
  niveles: [
    {
      id: "py-2-1",
      titulo: "if — La primera decisión",
      teoria: "El if permite ejecutar código solo si una condición es verdadera.\n\nSintaxis:\nif condición:\n    código a ejecutar\n\nImportante: en Python la indentación (4 espacios) define qué código pertenece al if. No hay llaves {} como en otros lenguajes.",
      ejemplo: {
        codigo: 'edad = 20\n\nif edad >= 18:\n    print("Eres mayor de edad")\n    print("Puedes entrar")\n\nprint("Fin del programa")',
        output: 'Eres mayor de edad\nPuedes entrar\nFin del programa'
      },
      pregunta: "¿Qué define qué código pertenece a un bloque if en Python?",
      opciones: ["Las llaves {}", "La indentación (4 espacios)", "Los paréntesis ()", "El punto y coma ;"],
      correcta: 1,
      explicacion: "Python usa indentación (espacios o tabs) para definir bloques de código. Todo lo que esté indentado bajo el if pertenece a ese bloque. Es obligatorio y consistente."
    },
    {
      id: "py-2-2",
      titulo: "if/else",
      teoria: "El else se ejecuta cuando la condición del if es False. Es el 'si no' de la decisión.\n\nSintaxis:\nif condición:\n    código si True\nelse:\n    código si False",
      ejemplo: {
        codigo: 'password = input("Contraseña: ")\n\nif password == "hackforge123":\n    print("✅ Acceso concedido")\nelse:\n    print("❌ Acceso denegado")',
        output: 'Contraseña: [hackforge123]\n✅ Acceso concedido'
      },
      pregunta: "¿Cuándo se ejecuta el bloque else?",
      opciones: [
        "Siempre",
        "Cuando la condición del if es True",
        "Cuando la condición del if es False",
        "Nunca, es opcional"
      ],
      correcta: 2,
      explicacion: "El else se ejecuta SOLO cuando la condición del if es False. Si el if es True, el else se salta completamente."
    },
    {
      id: "py-2-3",
      titulo: "elif — Múltiples condiciones",
      teoria: "elif (else if) permite verificar múltiples condiciones en secuencia. Se evalúan de arriba a abajo y solo se ejecuta el primer bloque verdadero.\n\nif condición1:\n    ...\nelif condición2:\n    ...\nelif condición3:\n    ...\nelse:\n    ...",
      ejemplo: {
        codigo: 'nota = 75\n\nif nota >= 90:\n    print("Sobresaliente")\nelif nota >= 70:\n    print("Aprobado")\nelif nota >= 50:\n    print("Suficiente")\nelse:\n    print("Reprobado")',
        output: 'Aprobado'
      },
      pregunta: "Si nota = 85, ¿qué imprime el ejemplo anterior?",
      opciones: ["Sobresaliente", "Aprobado", "Suficiente", "Reprobado"],
      correcta: 1,
      explicacion: "85 no es >= 90 (primer if falla), pero sí es >= 70 (primer elif es True). Se ejecuta 'Aprobado' y el resto se salta."
    },
    {
      id: "py-2-4",
      titulo: "Condiciones anidadas",
      teoria: "Puedes poner if dentro de otro if. Esto se llama anidamiento. Úsalo cuando necesitas verificar condiciones dentro de condiciones.\n\nCada nivel de anidamiento agrega 4 espacios más de indentación.",
      ejemplo: {
        codigo: 'usuario = "admin"\npassword = "1234"\n\nif usuario == "admin":\n    if password == "1234":\n        print("Acceso total concedido")\n    else:\n        print("Contraseña incorrecta")\nelse:\n    print("Usuario no encontrado")',
        output: 'Acceso total concedido'
      },
      pregunta: "¿Qué imprime si usuario='admin' y password='wrong'?",
      opciones: [
        "Acceso total concedido",
        "Contraseña incorrecta",
        "Usuario no encontrado",
        "Error"
      ],
      correcta: 1,
      explicacion: "El primer if (usuario=='admin') es True, entonces entra. El segundo if (password=='1234') es False porque password es 'wrong', entonces va al else interno: 'Contraseña incorrecta'."
    },
    {
      id: "py-2-5",
      titulo: "Operador ternario",
      teoria: "Python tiene una forma corta de escribir if/else en una sola línea llamada expresión ternaria o condicional.\n\nSintaxis:\nvalor = resultado_si_true if condición else resultado_si_false",
      ejemplo: {
        codigo: 'edad = 20\n\n# Forma larga:\nif edad >= 18:\n    estado = "Mayor"\nelse:\n    estado = "Menor"\n\n# Forma corta (ternario):\nestado = "Mayor" if edad >= 18 else "Menor"\n\nprint(estado)',
        output: 'Mayor'
      },
      pregunta: "¿Qué devuelve: x = 'par' if 10 % 2 == 0 else 'impar'?",
      opciones: ["impar", "par", "True", "Error"],
      correcta: 1,
      explicacion: "10 % 2 == 0 es True (10 es par), entonces x toma el valor 'par'. El operador ternario es útil para asignaciones simples pero no abuses de él en casos complejos."
    },
    {
      id: "py-2-6",
      titulo: "while — Bucle condicional",
      teoria: "El while repite un bloque de código MIENTRAS una condición sea True.\n\nSintaxis:\nwhile condición:\n    código a repetir\n\n⚠️ Cuidado: si la condición nunca se vuelve False, el bucle es infinito y el programa se cuelga.",
      ejemplo: {
        codigo: 'contador = 1\n\nwhile contador <= 5:\n    print(f"Intento {contador}")\n    contador += 1\n\nprint("Fin del bucle")',
        output: 'Intento 1\nIntento 2\nIntento 3\nIntento 4\nIntento 5\nFin del bucle'
      },
      pregunta: "¿Qué ocurre si la condición del while nunca se vuelve False?",
      opciones: [
        "El programa termina normalmente",
        "Python lanza un error automáticamente",
        "El bucle es infinito y el programa se cuelga",
        "El bucle se ejecuta exactamente 100 veces"
      ],
      correcta: 2,
      explicacion: "Un bucle infinito ocurre cuando la condición siempre es True. El programa nunca termina. Por eso siempre debes asegurarte de que algo dentro del while cambie la condición."
    },
    {
      id: "py-2-7",
      titulo: "while con input",
      teoria: "El while es perfecto para pedir datos al usuario hasta que ingrese algo válido. Esto se llama bucle de validación.",
      ejemplo: {
        codigo: 'password = ""\n\nwhile password != "hackforge":\n    password = input("Ingresa la contraseña: ")\n    if password != "hackforge":\n        print("❌ Incorrecta, intenta de nuevo")\n\nprint("✅ ¡Acceso concedido!")',
        output: 'Ingresa la contraseña: [wrong]\n❌ Incorrecta, intenta de nuevo\nIngresa la contraseña: [hackforge]\n✅ ¡Acceso concedido!'
      },
      pregunta: "¿Cuántas veces se ejecuta el while si el usuario ingresa la contraseña correcta al primer intento?",
      opciones: ["0 veces", "1 vez", "2 veces", "Infinitas veces"],
      correcta: 1,
      explicacion: "El while se ejecuta 1 vez: entra porque password='' != 'hackforge', pide input, el usuario ingresa correcto, verifica la condición de nuevo y como ahora es False, sale del bucle."
    },
    {
      id: "py-2-8",
      titulo: "break — Salir del bucle",
      teoria: "break termina el bucle inmediatamente, sin importar si la condición sigue siendo True.\n\nEs útil cuando encuentras lo que buscas y no necesitas seguir iterando.",
      ejemplo: {
        codigo: 'intentos = 0\n\nwhile True:  # bucle infinito controlado\n    password = input("Contraseña: ")\n    intentos += 1\n    \n    if password == "hackforge":\n        print(f"✅ Acceso en {intentos} intento(s)")\n        break  # sale del bucle\n    \n    if intentos >= 3:\n        print("🔒 Cuenta bloqueada")\n        break',
        output: 'Contraseña: [wrong]\nContraseña: [hackforge]\n✅ Acceso en 2 intento(s)'
      },
      pregunta: "¿Qué hace break dentro de un bucle?",
      opciones: [
        "Pausa el bucle temporalmente",
        "Termina el bucle inmediatamente",
        "Salta a la siguiente iteración",
        "Reinicia el bucle desde el principio"
      ],
      correcta: 1,
      explicacion: "break termina el bucle completamente y el programa continúa con el código después del bucle. Es diferente a continue que solo salta la iteración actual."
    },
    {
      id: "py-2-9",
      titulo: "continue — Saltar iteración",
      teoria: "continue salta el resto del código de la iteración actual y va directamente a la siguiente.\n\nA diferencia de break que termina el bucle, continue solo salta esa vuelta.",
      ejemplo: {
        codigo: '# Imprimir solo números impares del 1 al 10\nnumero = 0\n\nwhile numero < 10:\n    numero += 1\n    \n    if numero % 2 == 0:  # si es par\n        continue  # salta al siguiente\n    \n    print(numero)',
        output: '1\n3\n5\n7\n9'
      },
      pregunta: "¿Cuál es la diferencia entre break y continue?",
      opciones: [
        "No hay diferencia",
        "break termina el bucle, continue salta solo la iteración actual",
        "continue termina el bucle, break salta la iteración",
        "break es para while, continue es para for"
      ],
      correcta: 1,
      explicacion: "break sale completamente del bucle. continue salta al inicio de la siguiente iteración sin ejecutar el resto del código de la iteración actual."
    },
    {
      id: "py-2-10",
      titulo: "for — Bucle de iteración",
      teoria: "El for recorre cada elemento de una secuencia (string, lista, rango) uno por uno.\n\nSintaxis:\nfor variable in secuencia:\n    código\n\nEs más seguro que while porque no puede ser infinito — termina cuando se acaban los elementos.",
      ejemplo: {
        codigo: 'frutas = ["manzana", "banana", "naranja"]\n\nfor fruta in frutas:\n    print(f"Fruta: {fruta}")\n\n# También funciona con strings:\nfor letra in "Python":\n    print(letra)',
        output: 'Fruta: manzana\nFruta: banana\nFruta: naranja\nP\ny\nt\nh\no\nn'
      },
      pregunta: "¿Cuántas veces se ejecuta el for si la lista tiene 5 elementos?",
      opciones: ["4 veces", "5 veces", "6 veces", "Depende del contenido"],
      correcta: 1,
      explicacion: "El for se ejecuta exactamente una vez por cada elemento de la secuencia. Si la lista tiene 5 elementos, el bucle se ejecuta 5 veces."
    },
    {
      id: "py-2-11",
      titulo: "range() — Generar números",
      teoria: "range() genera una secuencia de números para usar con for.\n\n• range(n) → del 0 al n-1\n• range(inicio, fin) → del inicio al fin-1\n• range(inicio, fin, paso) → con salto entre números",
      ejemplo: {
        codigo: '# range(5) → 0,1,2,3,4\nfor i in range(5):\n    print(i, end=" ")\nprint()\n\n# range(1, 6) → 1,2,3,4,5\nfor i in range(1, 6):\n    print(i, end=" ")\nprint()\n\n# range(0, 10, 2) → 0,2,4,6,8\nfor i in range(0, 10, 2):\n    print(i, end=" ")',
        output: '0 1 2 3 4 \n1 2 3 4 5 \n0 2 4 6 8 '
      },
      pregunta: "¿Qué números genera range(2, 8)?",
      opciones: ["2,3,4,5,6,7,8", "2,3,4,5,6,7", "1,2,3,4,5,6,7,8", "2,4,6,8"],
      correcta: 1,
      explicacion: "range(inicio, fin) genera números desde inicio hasta fin-1 (sin incluir fin). range(2, 8) genera 2,3,4,5,6,7. El número 8 no se incluye."
    },
    {
      id: "py-2-12",
      titulo: "for con range — Contador",
      teoria: "Combinar for con range() es la forma estándar de repetir algo N veces o trabajar con índices numéricos.",
      ejemplo: {
        codigo: '# Tabla de multiplicar del 7:\nprint("Tabla del 7:")\nfor i in range(1, 11):\n    resultado = 7 * i\n    print(f"7 x {i} = {resultado}")',
        output: 'Tabla del 7:\n7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49\n7 x 8 = 56\n7 x 9 = 63\n7 x 10 = 70'
      },
      pregunta: "¿Qué imprime: for i in range(1, 4): print(i * 2)?",
      opciones: ["2 4 6 8", "2 4 6", "1 2 3", "0 2 4"],
      correcta: 1,
      explicacion: "range(1, 4) genera 1, 2, 3. Para cada i, imprime i*2: 1*2=2, 2*2=4, 3*2=6. Resultado: 2, 4, 6 (en líneas separadas)."
    },
    {
      id: "py-2-13",
      titulo: "enumerate() — Índice + valor",
      teoria: "enumerate() te da el índice Y el valor de cada elemento al mismo tiempo. Muy útil cuando necesitas saber la posición de cada elemento.",
      ejemplo: {
        codigo: 'hackers = ["Kevin Mitnick", "Anonymous", "Linus Torvalds"]\n\nfor i, nombre in enumerate(hackers):\n    print(f"{i+1}. {nombre}")\n\n# enumerate empieza en 0 por defecto\n# enumerate(lista, start=1) empieza en 1',
        output: '1. Kevin Mitnick\n2. Anonymous\n3. Linus Torvalds'
      },
      pregunta: "¿Qué devuelve enumerate() en cada iteración?",
      opciones: [
        "Solo el índice",
        "Solo el valor",
        "El índice y el valor",
        "El índice, el valor y el tipo"
      ],
      correcta: 2,
      explicacion: "enumerate() devuelve una tupla (índice, valor) en cada iteración. Por eso usamos 'for i, valor in enumerate(lista)' para desempaquetar ambos valores."
    },
    {
      id: "py-2-14",
      titulo: "Bucles anidados",
      teoria: "Puedes poner un bucle dentro de otro. El bucle interno se ejecuta completamente por cada iteración del bucle externo.\n\nSe usan para matrices, tablas, combinaciones y patrones.",
      ejemplo: {
        codigo: '# Tabla de multiplicar completa:\nfor i in range(1, 4):\n    for j in range(1, 4):\n        print(f"{i}x{j}={i*j}", end="  ")\n    print()  # nueva línea al final de cada fila',
        output: '1x1=1  1x2=2  1x3=3  \n2x1=2  2x2=4  2x3=6  \n3x1=3  3x2=6  3x3=9  '
      },
      pregunta: "Si el bucle externo va de 1 a 3 y el interno de 1 a 3, ¿cuántas veces se ejecuta el código interno en total?",
      opciones: ["3 veces", "6 veces", "9 veces", "12 veces"],
      correcta: 2,
      explicacion: "El bucle interno se ejecuta 3 veces por cada iteración del externo. Como el externo también va 3 veces: 3 × 3 = 9 ejecuciones totales del código interno."
    },
    {
      id: "py-2-15",
      titulo: "for/else y while/else",
      teoria: "En Python, los bucles pueden tener un bloque else que se ejecuta cuando el bucle termina NORMALMENTE (sin break).\n\nSi el bucle termina con break, el else NO se ejecuta.",
      ejemplo: {
        codigo: '# Buscar un número en una lista:\nnumeros = [1, 3, 5, 7, 9]\nbuscado = 5\n\nfor num in numeros:\n    if num == buscado:\n        print(f"✅ Encontrado: {buscado}")\n        break\nelse:\n    print(f"❌ {buscado} no está en la lista")',
        output: '✅ Encontrado: 5'
      },
      pregunta: "¿Cuándo se ejecuta el bloque else de un bucle for?",
      opciones: [
        "Siempre al final del for",
        "Solo cuando el for termina con break",
        "Cuando el for termina normalmente sin break",
        "Nunca, el else solo es para if"
      ],
      correcta: 2,
      explicacion: "El else del bucle se ejecuta cuando el bucle termina normalmente (agotó todos los elementos). Si el bucle termina con break, el else se omite."
    },
    {
      id: "py-2-16",
      titulo: "Comprensión de listas",
      teoria: "La comprensión de listas es una forma elegante y compacta de crear listas usando for en una sola línea.\n\nSintaxis:\nnueva_lista = [expresión for elemento in iterable if condición]",
      ejemplo: {
        codigo: '# Forma tradicional:\ncuadrados = []\nfor i in range(1, 6):\n    cuadrados.append(i ** 2)\nprint(cuadrados)\n\n# Comprensión de lista (mismo resultado):\ncuadrados = [i ** 2 for i in range(1, 6)]\nprint(cuadrados)\n\n# Con condición:\npares = [i for i in range(10) if i % 2 == 0]\nprint(pares)',
        output: '[1, 4, 9, 16, 25]\n[1, 4, 9, 16, 25]\n[0, 2, 4, 6, 8]'
      },
      pregunta: "¿Qué produce: [x*2 for x in range(1,4)]?",
      opciones: ["[1, 2, 3]", "[2, 4, 6]", "[2, 4, 6, 8]", "[1, 4, 9]"],
      correcta: 1,
      explicacion: "range(1,4) genera 1,2,3. Para cada x multiplicamos por 2: 1*2=2, 2*2=4, 3*2=6. Resultado: [2, 4, 6]."
    },
    {
      id: "py-2-17",
      titulo: "Patrones con bucles",
      teoria: "Los bucles anidados son perfectos para crear patrones visuales. Es un ejercicio clásico que desarrolla el pensamiento lógico.",
      ejemplo: {
        codigo: '# Triángulo de asteriscos:\nfilas = 5\nfor i in range(1, filas + 1):\n    print("*" * i)\n\nprint()\n\n# Triángulo invertido:\nfor i in range(filas, 0, -1):\n    print("*" * i)',
        output: '*\n**\n***\n****\n*****\n\n*****\n****\n***\n**\n*'
      },
      pregunta: "¿Qué hace range(5, 0, -1)?",
      opciones: [
        "Genera 0,1,2,3,4,5",
        "Genera 5,4,3,2,1,0",
        "Genera 5,4,3,2,1",
        "Da error porque el paso es negativo"
      ],
      correcta: 2,
      explicacion: "range(inicio, fin, paso) con paso negativo cuenta hacia atrás. range(5, 0, -1) genera 5,4,3,2,1 (sin incluir el 0). Es perfecto para bucles que cuentan hacia atrás."
    },
    {
      id: "py-2-18",
      titulo: "Acumuladores y contadores",
      teoria: "Un patrón muy común en programación es usar variables para acumular resultados dentro de un bucle.\n\n• Contador: cuenta cuántas veces ocurre algo\n• Acumulador: suma/concatena valores\n• Máximo/Mínimo: encuentra el valor extremo",
      ejemplo: {
        codigo: 'numeros = [4, 7, 2, 9, 1, 5, 8, 3, 6]\n\ntotal = 0\ncontador = 0\nmaximo = numeros[0]\n\nfor n in numeros:\n    total += n\n    if n > 5:\n        contador += 1\n    if n > maximo:\n        maximo = n\n\nprint(f"Suma: {total}")\nprint(f"Mayores que 5: {contador}")\nprint(f"Máximo: {maximo}")',
        output: 'Suma: 45\nMayores que 5: 4\nMáximo: 9'
      },
      pregunta: "¿Para qué se inicializa una variable en 0 antes de un bucle?",
      opciones: [
        "Es obligatorio en Python",
        "Para usarla como acumulador o contador dentro del bucle",
        "Para evitar errores de tipo",
        "Para que el bucle sepa cuántas veces ejecutarse"
      ],
      correcta: 1,
      explicacion: "Inicializar en 0 antes del bucle permite acumular (sumar) o contar dentro del bucle. Sin la inicialización, Python daría NameError al intentar hacer total += n."
    },
    {
      id: "py-2-19",
      titulo: "Validación de entrada",
      teoria: "Un patrón muy útil es combinar while + if para validar que el usuario ingrese datos correctos antes de continuar.",
      ejemplo: {
        codigo: 'while True:\n    try:\n        edad = int(input("Ingresa tu edad (0-120): "))\n        if 0 <= edad <= 120:\n            break\n        else:\n            print("❌ Edad fuera de rango")\n    except ValueError:\n        print("❌ Debes ingresar un número")\n\nprint(f"✅ Edad registrada: {edad}")',
        output: 'Ingresa tu edad (0-120): [abc]\n❌ Debes ingresar un número\nIngresa tu edad (0-120): [200]\n❌ Edad fuera de rango\nIngresa tu edad (0-120): [25]\n✅ Edad registrada: 25'
      },
      pregunta: "¿Qué hace try/except en este contexto?",
      opciones: [
        "Nada especial, es decorativo",
        "Captura el error si el usuario escribe texto en vez de número",
        "Convierte automáticamente el texto a número",
        "Detiene el programa si hay un error"
      ],
      correcta: 1,
      explicacion: "try/except captura errores en tiempo de ejecución. Si int() no puede convertir el texto (ej: 'abc'), lanza ValueError. El except lo captura y muestra el mensaje de error en vez de crashear."
    },
    {
      id: "py-2-20",
      titulo: "Resumen Mundo 2",
      teoria: "¡Completaste el Mundo 2! Repasemos:\n\n✅ if / elif / else\n✅ Operador ternario\n✅ while + break + continue\n✅ for + range()\n✅ enumerate()\n✅ Bucles anidados\n✅ Comprensión de listas\n✅ Acumuladores y contadores\n✅ Validación de entrada\n\nAhora el DESAFÍO — combinarás todo lo aprendido.",
      ejemplo: {
        codigo: '# Control de flujo en acción:\nnumeros = []\n\nprint("Ingresa 5 números:")\nfor i in range(1, 6):\n    while True:\n        try:\n            n = int(input(f"Número {i}: "))\n            numeros.append(n)\n            break\n        except ValueError:\n            print("Solo números enteros")\n\npares = [n for n in numeros if n % 2 == 0]\nimpares = [n for n in numeros if n % 2 != 0]\n\nprint(f"Suma total: {sum(numeros)}")\nprint(f"Pares: {pares}")\nprint(f"Impares: {impares}")',
        output: 'Ingresa 5 números:\nNúmero 1: [4]\nNúmero 2: [7]\nNúmero 3: [2]\nNúmero 4: [9]\nNúmero 5: [6]\nSuma total: 28\nPares: [4, 2, 6]\nImpares: [7, 9]'
      },
      pregunta: "¿Cuál de estas es una comprensión de lista válida?",
      opciones: [
        "[for x in range(5)]",
        "[x*2 for x in range(5)]",
        "[x*2 in range(5)]",
        "list(x*2, range(5))"
      ],
      correcta: 1,
      explicacion: "[x*2 for x in range(5)] es la sintaxis correcta: [expresión for variable in iterable]. Genera [0, 2, 4, 6, 8]."
    }
  ],
  desafio: {
    titulo: "Desafío Final — Juego de Adivinanza",
    descripcion: "Crea un juego donde el programa tiene un número secreto (42) y el usuario debe adivinarlo. El programa da pistas y limita los intentos.",
    instrucciones: [
      "Define el número secreto = 42 y max_intentos = 5",
      "Usa un bucle while para pedir intentos al usuario",
      "Convierte el input a entero con int()",
      "Si el número es mayor al secreto, imprime 'Muy alto'",
      "Si el número es menor al secreto, imprime 'Muy bajo'",
      "Si adivina, imprime '¡Ganaste!' y termina el bucle con break",
      "Si se acaban los intentos sin adivinar, imprime '¡Perdiste! Era el 42'"
    ],
    solucion: `secreto = 42
max_intentos = 5
intentos = 0

while intentos < max_intentos:
    intentos += 1
    numero = int(input(f"Intento {intentos}/{max_intentos}: "))
    
    if numero > secreto:
        print("📈 Muy alto")
    elif numero < secreto:
        print("📉 Muy bajo")
    else:
        print(f"🎉 ¡Ganaste en {intentos} intento(s)!")
        break
else:
    print(f"💀 ¡Perdiste! Era el {secreto}")`,
    test: (codigo) => {
      return codigo.includes("while") &&
             codigo.includes("int") &&
             codigo.includes("input") &&
             (codigo.includes("break") || codigo.includes("else")) &&
             (codigo.includes(">") || codigo.includes("<")) &&
             codigo.includes("42");
    }
  }
},
    {
      id: 3,
      nombre: "Funciones",
      icon: "⚙️",
      color: "#8b5cf6",
      descripcion: "def, parámetros, return. Organiza y reutiliza tu código.",
      bloqueado: true,
      niveles: [],
      desafio: null
    },
    {
      id: 4,
      nombre: "Estructuras de Datos",
      icon: "📦",
      color: "#f59e0b",
      descripcion: "Listas, diccionarios, tuplas. Maneja colecciones de datos.",
      bloqueado: true,
      niveles: [],
      desafio: null
    },
    {
      id: 5,
      nombre: "Programador Real",
      icon: "🚀",
      color: "#ef4444",
      descripcion: "Archivos, módulos, errores. Proyectos del mundo real.",
      bloqueado: true,
      niveles: [],
      desafio: null
    }
  ]
};

export default PYTHON_PATH;
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
      bloqueado: true,
      niveles: [],
      desafio: null
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

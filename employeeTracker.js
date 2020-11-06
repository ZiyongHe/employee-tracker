const inquirer = require('inquirer')
const mysql = require('mysql2/promise')

const VIEW_EMPLOYEES = 'View all employees'
const VIEW_ROLES = 'View all roles'
const VIEW_DEPARTMENTS = 'View all department'
const ADD_EMPLOYEE = 'Add employee'
const ADD_ROLE = 'Add role'
const ADD_DEPARTMENT = 'Add department'
const UPDATE_EMPLOYEE_ROLE = 'Update employee role'
const QUIT = 'Quit'

let connection
main()

async function main () {
  let shouldContinue = true
  try {
    await connect()
    console.log('****************  WELCOME TO EMPLOYEE TRACKER  *****************')
    while (shouldContinue) {
      shouldContinue = await mainMenu()
    }
  } catch (error) {
    console.error(error)
  } finally {
    if (connection) connection.end()
  }
}

// Pass the connection details to the MySQL driver to open
// a connection to the database.
async function connect () {
  connection = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '465335830@QQ.com',
    database: 'employee_tracker_db'
  })
  console.log(`Connected to DB as id: ${connection.threadId}`)
}

async function promptAction () {
  return inquirer.prompt({
    name: 'action',
    type: 'list',
    message: 'What would you like to do?',
    choices: [
      VIEW_EMPLOYEES,
      VIEW_ROLES,
      VIEW_DEPARTMENTS,
      ADD_EMPLOYEE,
      ADD_ROLE,
      ADD_DEPARTMENT,
      UPDATE_EMPLOYEE_ROLE,
      QUIT
    ]
  })
}

async function mainMenu () {
  console.log('\n------------------------------------\n')
  const answer = await promptAction()

  switch (answer.action) {
    case VIEW_EMPLOYEES:
      return viewEmployees()
    case VIEW_ROLES:
      return viewRoles()
    case VIEW_DEPARTMENTS:
      return viewDepartments()
    case ADD_EMPLOYEE:
      return addEmployee()
    case ADD_ROLE:
      return addRole()
    case ADD_DEPARTMENT:
      return addDepartment()
    case UPDATE_EMPLOYEE_ROLE:
      return updateEmployeeRole()
    case QUIT:
    default:
      return false
  }
}

async function viewEmployees () {
  try {
    const sql = 'SELECT employee_ID, first_name, last_name, title, salary, department FROM employee LEFT JOIN `role` ON  `role`.id = employee.role_id LEFT JOIN department ON department.id = department_id'
    const [rows] = await connection.query(sql)
    console.log('ID   first_name   last_name   title          salary     department')
    console.log('--   ----------   ---------   ------------   ------------   ------------------')
    rows.forEach(row => {
      console.log(
        `${row.employee_ID} | ${row.first_name} | ${row.last_name} | ${row.title} | ${row.salary} | ${row.department} \n`
      )
    })
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

async function viewRoles () {
  try {
    const sql = 'SELECT title, salary, department FROM `role` LEFT JOIN department ON department.id = department_id'
    const [rows] = await connection.query(sql)
    console.log('title          salary     department')
    console.log('------------   ------------   ------------------')
    rows.forEach(row => {
      console.log(
        `${row.title} | ${row.salary} | ${row.department} \n`
      )
    })
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

async function viewDepartments () {
  try {
    const sql = 'SELECT * FROM department'
    const [rows] = await connection.query(sql)
    console.log('department_id     department')
    console.log('-------------     ------------------')
    rows.forEach(row => {
      console.log(
        `${row.id} | ${row.department} \n`
      )
    })
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

async function addEmployee() {
  try {
    // const titles = []
    // let sql = 'SELECT title FROM `role`'
    // const [rows] = await connection.query(sql)
    // rows.forEach(row => titles.push(row.title))

    // const first_name = await inquirer.prompt({
    //   name: 'first_name',
    //   type: 'input',
    //   message: 'Type first name?'
    // })
    // const last_name = await inquirer.prompt({
    //   name: 'last_name',
    //   type: 'input',
    //   message: 'Type last name?'
    // })
    // const title = await inquirer.prompt({
    //   name: 'title',
    //   type: 'input',
    //   message: 'Type title'
    // })
    // const salary = await inquirer.prompt({
    //   name: 'salary',
    //   type: 'input',
    //   message: 'Set salary?'
    // })
    const department = await inquirer.prompt({
      name: 'department',
      type: 'input',
      message: 'Assign department'
    }).then(async function (res) {
      sql = `INSERT INTO departments (department) VALUES (${res});`
      const [result] = await connection.query(sql)
      const [data] = await connection.query(`SELECT * FROM department WHERE ?`,{
        id: result.insertID
      })
      console.log(result)
      console.log(data)
    })

  
    // sql = `INSERT INTO employee (first_name, last_name, title, salary) VALUES (${first_name}, ${last_name}, ${title}, ${salary})`





//     console.log('department_id     department')
//     console.log('-------------     ------------------')
//     rows.forEach(row => {
//       console.log(
//         `${row.id} | ${row.department} \n`
//       )
//     })
    return true
  } catch (err) {
    console.log(err)
    return false
  }
 }

//     const sql =
//       'SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?'
//     const [rows] = await connection.query(sql, [answer.start, answer.end])
//     rows.forEach(({ position, song, artist, year }) =>
//       console.log(
//         `\nPosition: ${position} | Song: ${song} | Artist: ${artist} | Year: ${year}`
//       )
//     )
//     return true
//   } catch (err) {
//     console.log(err)
//     return false
//   }
// }

async function songSearch () {
  try {
    const { song } = await inquirer.prompt({
      name: 'song',
      type: 'input',
      message: 'What song would you like to look for?'
    })

    const [rows] = await connection.query(
      'SELECT * FROM top5000 WHERE song LIKE ?',
      [`%${song}%`]
    )
    rows.forEach(({ position, song, artist, year }) =>
      console.log(
        `\nPosition: ${position} | Song: ${song} | Artist: ${artist} | Year: ${year}`
      )
    )
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

// async function songAndAlbumSearch () {
//   try {
//     const answer = await inquirer.prompt({
//       name: 'artist',
//       type: 'input',
//       message: 'What artist would you like to search for?'
//     })

//     const sql = `
//     SELECT top_albums.year, top_albums.album, top_albums.position, top5000.song, top5000.artist
//       FROM top_albums 
// INNER JOIN top5000 
//         ON (top_albums.artist = top5000.artist AND top_albums.year = top5000.year) 
//      WHERE top5000.artist = ?
//   ORDER BY top_albums.year, top_albums.position
//   `

//     const [rows] = await connection.query(sql, [answer.artist])
//     console.log(`\n ${rows.length} matches found!`)
//     rows.forEach(({ year, position, artist, song, album }, index) =>
//       console.log(`
// ${index +
//   1}.) Year: ${year} | Position: ${position} | Artist: ${artist} | Song: ${song} | Album: ${album}`)
//     )

//     return true
//   } catch (err) {
//     console.log(err)
//     return false
//   }
// }

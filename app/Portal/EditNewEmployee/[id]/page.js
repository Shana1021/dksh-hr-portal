import Edit from "./edit";

const getEmployeeById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/HRStaff/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch topic");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function EditNewEmployee({ params }) {
  const { id } = params;
  console.log("id:", id);
  const { topic } = await getEmployeeById(id);
  const {
    fname,
    lname,
    empId,
    password,
    address1,
    address2,
    email,
    gender,
    dob,
    country,
    city,
    state,
    position,
    department,
    code,
    number,
  } = topic;
  return (
    <>
      <Edit
        id={id}
        fname={fname}
        lname={lname}
        empId={empId}
        password={password}
        address1={address1}
        address2={address2}
        email={email}
        gender={gender}
        dob={dob}
        country={country}
        city={city}
        state={state}
        position={position}
        department={department}
        code={code}
        number={number}
      />
    </>
  );
}

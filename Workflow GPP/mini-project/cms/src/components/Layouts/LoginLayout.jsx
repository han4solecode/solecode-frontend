import { Outlet } from "react-router-dom";

function LoginLayout(props) {
  const {} = props;

  return (
    <section>
      <div className="grid grid-cols-2 min-h-screen">
        <div>
          <Outlet></Outlet>
        </div>
        <div>
          <img
            src="https://media.istockphoto.com/id/178447404/photo/modern-business-buildings.jpg?s=612x612&w=0&k=20&c=MOG9lvRz7WjsVyW3IiQ0srEzpaBPDcc7qxYsBCvAUJs="
            alt="company picture"
            className="size-full"
          />
        </div>
      </div>
    </section>
  );
}

export default LoginLayout;

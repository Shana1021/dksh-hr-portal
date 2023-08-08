"use client";
import "./dashboard.css";
import { useSession } from "next-auth/react";
import Image from "next/image";
import "boxicons";
export default function Dashboard({ data }) {
  const { data: session, status } = useSession();

  console.log(session);
  console.log(status);

  return (
    <>
      <div className="sidebar close">
        <div className="logo-details">
          <Image
            src="/dksh_logo.png"
            alt="DKSH Logo"
            fill
            // sizes="50px"
            style={{ objectFit: "contain" }}
            placeholder="blur"
            blurDataURL="/dksh_logo.png"
          />
          <span className="logo_name">HR Portal</span>
        </div>
        <ul className="nav-links">
          <li>
            <a href="#">
              <i className="bx bxs-dashboard"></i>
              <span className="link_name">Dashboard</span>
            </a>
            <ul className="sub-menu blank">
              <li>
                <a class="link_name" href="#">
                  Dashboard
                </a>
              </li>
            </ul>
          </li>
          <li>
            <div className="iocn-link">
              <a href="#">
                <box-icon type="solid" name="pear"></box-icon>
                <span className="link_name">Onboarding</span>
              </a>
              <i className="bx bxs-chevron-down arrow"></i>
            </div>
            <ul className="sub-menu">
              <li>
                <a className="link_name" href="#">
                  Onboarding
                </a>
              </li>
              <li>
                <a href="#">Background Check</a>
              </li>
              <li>
                <a href="#">CheckList</a>
              </li>
              <li>
                <a href="#">Probationary</a>
              </li>
            </ul>
          </li>
          <li>
            <div className="iocn-link">
              <a href="#">
                <i className="bx bx-book"></i>
                <span className="link_name">Training</span>
              </a>
              <i class="bx bxs-chevron-down arrow"></i>
            </div>
            <ul class="sub-menu">
              <li>
                <a class="link_name" href="#">
                  Training
                </a>
              </li>
              <li>
                <a href="#">Request Training</a>
              </li>
              <li>
                <a href="#">Status Check</a>
              </li>
            </ul>
          </li>
          <li>
            <div className="iocn-link">
              <a href="#">
                <i className="bx bx-notepad"></i>
                <span className="link_name">Offboarding</span>
              </a>
              <i className="bx bxs-chevron-down arrow"></i>
            </div>
            <ul className="sub-menu">
              <li>
                <a className="link_name" href="#">
                  Offboarding
                </a>
              </li>
              <li>
                <a href="#">Request for Resignation</a>
              </li>
              <li>
                <a href="#">Resignation Requests</a>
              </li>
              <li>
                <a href="#">CheckList</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">
              <i class="bi bi-123"></i>
              <span className="link_name">HR List</span>
            </a>
            <ul className="sub-menu blank">
              <li>
                <a claclassNames="link_name" href="#">
                  HR List
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-cog"></i>
              <span className="link_name">Settings</span>
            </a>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href="#">
                  Settings
                </a>
              </li>
            </ul>
          </li>
          <li>
            <div className="profile-details">
              <div className="profile-content">
                <Image
                  src="/dksh_logo.png"
                  alt="DKSH Logo"
                  fill
                  // sizes="50px"
                  style={{ objectFit: "contain" }}
                  placeholder="blur"
                  blurDataURL="/dksh_logo.png"
                />
              </div>
              <div className="name-job">
                <div className="profile_name">Jared</div>
                <div className="job">HR Manager</div>
              </div>
              <i className="bx bx-log-out"></i>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}

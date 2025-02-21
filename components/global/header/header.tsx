/*
 * Header Component
 *
 * Author: Andre Repanich
 * Date: 05-10-24
 *
 * Component Requirements
 * - navigation header
 */

import Target from "./target";

const Header = () => {
  return (
    <div className="flex md:justify-between w-full items-center gap-2">
      <Target />
      <div className="flex space-x-3"></div>
    </div>
  );
};

export default Header;

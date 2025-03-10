function Avatar() {
  return (
    <div className="flex items-center gap-2 mr-2 sm:mr-4">
      <div className="w-10 h-10 rounded-full overflow-hidden shadow-lg border border-teal-600 border-opacity-35">
        <img
          src="/avatar.jpg"
          alt="Avatar"
          className="w-full h-full object-cover"
        />
      </div>
      <h1 className="hidden sm:inline">User</h1>
    </div>
  );
}

export default Avatar;

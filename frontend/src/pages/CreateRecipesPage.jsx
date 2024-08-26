const CreateRecipesPage = () => {
  const handleSubmit = () => {};
  return (
    <div className="flex flex-col">
      <h1 className="font-semibold text-3xl py-5 px-5">Create Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5 px-10">
          <div className="flex gap-4">
            <label htmlFor="title">Recipe Name</label>
            <input
              type="text"
              name="recipe-title"
              id="title"
              className="bg-slate-400 h-7"
            />
          </div>
          <div className="flex gap-4">
            <label htmlFor="title">Recipe Name</label>
            <input
              type="text"
              name="recipe-image"
              id="image-url"
              className="bg-slate-400 h-7"
            />
          </div>
          <div className="flex gap-4">
            <label htmlFor="title">Recipe Name</label>
            <textarea
              rows={100}
              cols={100}
              name="recipe-description"
              id="description"
              className="bg-slate-400 h-[10rem]"
            />
          </div>
        </div>

        <button type="submit" className="bg-slate-500">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateRecipesPage;

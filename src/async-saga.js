export default () => {
  let listeners = []

  const dispatcher = action => {
    const toNotify = [...listeners]
    for (let i = 0; i < toNotify.length; i++) {
      toNotify[i](action);
    }
  }

  const createListener = callback => {
    listeners = [
      ...listeners,
      callback
    ]

    return () => {
      listeners = listeners.filter(listener => listener !== callback)
    }
  }

  const createActionListener = (callback, actionType) => {
    return createListener(action => {
      if (action.type === actionType) {
        callback(action)
      }
    })
  }

  const createSinglectionListener = (actionType, callback) => {
    const unsubscribe = createListener(action => {
      if (action.type === actionType) {
        callback(action)
        unsubscribe()
      }
    })
  }

  const middleware = store => next => action => {
    const result = next(action);

    // const toRunOnce = (runOnce[action.type] || []);
    // runOnce[action.type] = [];
    //
    // for (let i = 0; i < toRunOnce.length; i++) {
    //   toRunOnce[i]();
    // }
    //
    // const toRunAlways = (runAlways[action.type] || [])
    //
    // for (let i = 0; i < toRunAlways.length; i++) {
    //   toRunAlways[i]();
    // }

    dispatcher(action)

    return result
  }

  const run = store => {
    const runFunc = func => func({
        dispatch: store.dispatch,
        select: (func, ...params) => func(store.getState(),  ...params),
        take: (actionType) => {
          return new Promise(
            res => {
              createSinglectionListener(actionType, (...params) => {
                res();
              })
            }
          )

        },
        takeEvery: (actionType, func) => createActionListener(func, actionType),
        run: async toRun => await runFunc(toRun)
      }
    );

    return runFunc;
  }

  const initialize = (store, sagas) => {
    sagas.forEach(run(store))
  };

  return {
    middleware,
    initialize
  };
}
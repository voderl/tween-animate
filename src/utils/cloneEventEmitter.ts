export default function cloneEventEmitter(from: any, to: any) {
  const { _events, _eventsCount } = from;
  if (_eventsCount === 0) return;
  const toEvents = to._events;
  for (const key in _events) {
    const item = _events[key];
    if (Array.isArray(item)) {
      toEvents[key] = [...item];
    } else toEvents[key] = item;
  }
  to._eventsCount = _eventsCount;
}
